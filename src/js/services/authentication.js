/**
 * Created by danielalorenzo on 18/6/15.
 */
angular.module('authentication', [])

    .service("googleApiBuilder", function($q) {
        this.loadClientCallbacks = [];

        this.build = function(requestBuilder, responseTransformer) {
            return function(args) {
                var deferred = $q.defer();
                var response;
                request = requestBuilder(args);
                request.execute(function(resp, raw) {
                    if(resp.error) {
                        deferred.reject(resp.error);
                    } else {
                        response = responseTransformer ? responseTransformer(resp) : resp;
                        deferred.resolve(response);
                    }

                });
                return deferred.promise;

            }
        };

        this.afterClientLoaded = function(callback) {
            this.loadClientCallbacks.push(callback);
        };

        this.runClientLoadedCallbacks = function() {
            for(var i=0; i < this.loadClientCallbacks.length; i++) {
                this.loadClientCallbacks[i]();
            }
        };
    })

    .provider('googleLogin', function() {

        this.configure = function(conf) {
            this.config = conf;
        };

        this.$get = function ($q, googleApiBuilder, $rootScope) {
            var config = this.config;
            var deferred = $q.defer();
            return {
                /*setToken: function(data) {
                    *//* Cache the token *//*
                    localStorage.access_token = data.access_token;

                    *//* Cache the refresh token, if there is one *//*
                    localStorage.refresh_token = data.refresh_token || localStorage.refresh_token;

                    *//* Figure out when the token will expire by using the current time, plus the valid time (in seconds), minus a 1 minute buffer *//*
                    var expiresAt = new Date().getTime() + parseInt(data.expires_in, 10) * 1000 - 60000;
                    localStorage.expires_at = expiresAt;
                },*/
                login: function () {
                    gapi.auth.authorize({
                        client_id: config.clientId,
                        scope: config.scopes,
                        response_type: 'code',
                        immediate: false},
                        this.handleAuthResult);

                    return deferred.promise;
                },

                handleClientLoad: function () {
                    gapi.auth.init(function () { });
                    window.setTimeout(checkAuth, 1);
                },

                checkAuth: function() {
                    gapi.auth.authorize({
                        client_id: config.clientId,
                        scope: config.scopes,
                        response_type: 'code',
                        immediate: true },
                        this.handleAuthResult);
                },

                handleAuthResult: function(authResult) {
                    /*console.log('Estoy en el servicio con el auth: '+authResult);*/
                    if (authResult && !authResult.error) {
                        var data = {};
                        $rootScope.$broadcast("google:authenticated", authResult);
                        googleApiBuilder.runClientLoadedCallbacks();
                        deferred.resolve(data);
                    } else {
                        deferred.reject(authResult.error);
                    }
                }

                /*getToken: function(options) {
                    var deferred = $.Deferred();

                    if (new Date().getTime() < localStorage.expires_at) {
                        deferred.resolve({
                            access_token: localStorage.access_token
                        });
                    } else if (localStorage.refresh_token) {
                        $.post('https://accounts.google.com/o/oauth2/token', {
                            refresh_token: localStorage.refresh_token,
                            client_id: options.client_id,
                            grant_type: 'refresh_token'
                        }).done(function(data) {
                            this.setToken(data);
                            deferred.resolve(data);
                        }).fail(function(response) {
                            deferred.reject(response.responseJSON);
                        });
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise();
                }*/
            }
        };


    })

    .service("googlePlus", function(googleApiBuilder, $rootScope) {

        var self = this;

        googleApiBuilder.afterClientLoaded(function() {
            gapi.client.load('plus', 'v1', function() {
                self.getPeople = googleApiBuilder.build(gapi.client.plus.people.get);
                self.getCurrentUser = function() {
                    return self.getPeople({userId: "me"});
                };
                $rootScope.$broadcast("googlePlus:loaded")
            });

        });

    });