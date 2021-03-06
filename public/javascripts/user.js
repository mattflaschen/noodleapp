'use strict';

define(['jquery'],
  function ($) {

  var overlay = $('#overlay');
  var flashMsg = $('#flash-message');
  var directedFeed = false;
  var mediaOn = false;
  var charLimit = false;
  var highContrast = false;

  var self = {
    getSettings: function() {
      overlay.find('.write').hide();
      overlay.find('.inner-overlay').html('<ol class="messages"><li class="message-item loading"></li></ol>');
      overlay.slideDown();
      $.ajax({
        url: '/settings',
        type: 'GET',
        dataType: 'json',
        cache: false

      }).done(function(data) {
        var settingsList = $('<h1>Settings</h1><ol class="message-summary settings-details"><li><ul><li>' +
          '<a href="javascript:;" id="directed-feed" title="Include posts directed to users I don\'t follow"></a>' +
          '<p>Include posts directed to users I don\'t follow</p></li>' +
          '<li><a href="javascript:;" id="media-on" title="Auto-embed media"></a> <p>Auto-embed media</p></li>' +
          '<li><a href="javascript:;" id="charlimit" title="Limit to 140 characters"></a> <p>Limit to 140 characters</p></li>' +
          '<li><a href="javascript:;" id="high-contrast" title="Set high contrast interface"></a> ' +
          '<p>Set high contrast interface</p></li></ul></li><li class="close">Close</li></ol>');

        if (data.settings.directedFeed === 'true') {
          settingsList.find('#directed-feed').addClass('on');
          directedFeed = true;
        }

        if (data.settings.mediaOn === 'true') {
          settingsList.find('#media-on').addClass('on');
          mediaOn = true;
        }

        if (data.settings.charLimit === 'true') {
          settingsList.find('#charlimit').addClass('on');
          charLimit = true;
        }

        if (data.settings.highContrast === 'true') {
          settingsList.find('#high-contrast').addClass('on');
          highContrast = true;
        }

        overlay.find('.inner-overlay').html(settingsList);
      });
    },

    saveSettings: function(directedFeed, mediaOn, charLimit, highContrast, csrf) {
      $.ajax({
        url: '/settings',
        type: 'POST',
        data: {
          directed_feed: directedFeed,
          media_on: mediaOn,
          char_limit: charLimit,
          high_contrast: highContrast,
          _csrf: csrf
        },
        dataType: 'json',
        cache: false

      }).done(function(data) {
        flashMsg.text('Saved! Please refresh.');
        flashMsg.fadeIn(200, function() {
          $(this).fadeOut(6500);
        });
      });
    }
  };

  return self;
});
