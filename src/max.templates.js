/*jshint multistr: true */
var max = max || {};

/**
* @fileoverview Provides hogan compiled templates
*               ready to render.
*/

max.templates = function() {

    var templates = {

    activity: Hogan.compile('\
<div class="maxui-activity" id="{{id}}" userid="{{actor.id}}" username="{{actor.username}}">\
            <div class="maxui-activity-content">\
                <div class="maxui-topright">\
                    {{^showLikesCount}}<span class="maxui-publisheddate">{{date}}</span>{{/showLikesCount}}\
                    {{#showLikesCount}}<span class="maxui-likescount"><strong>{{likes}}</strong><i class="maxui-icon-thumbs-up"></i></span>{{/showLikesCount}}\
                </div>\
                <div class="maxui-actor">\
                      <a href="#"><span class="maxui-avatar maxui-big"><img src="{{avatarURL}}"></span>\
                          <span class="maxui-displayname">{{actor.displayName}}</span></a>\
                  <span class="maxui-username">{{actor.username}}&nbsp;</span>\
                </div>\
                <div class="maxui-activity-message">\
                    <p class="maxui-body">{{&text}}</p>\
                </div>\
            </div>\
            <div class="maxui-footer">\
                {{#publishedIn}}\
                <div class="maxui-origin maxui-icon-">\
                       {{literals.context_published_in}}\
                       <a href="{{publishedIn.url}}">{{publishedIn.displayName}}</a>\
                       {{#via}}\
                           {{literals.generator_via}}\
                           <span class="maxui-via">\
                           {{via}}\
                           </span>\
                       {{/via}}\
                </div>\
                {{/publishedIn}}\
                <div class="maxui-actions">\
                    <a href="" class="maxui-action maxui-commentaction maxui-icon- {{#replies}}maxui-has-comments{{/replies}}"><strong>{{replies.length}}</strong> {{literals.toggle_comments}}</a>\
                    <a href="" class="maxui-action maxui-favorites {{#favorited}}maxui-favorited{{/favorited}} maxui-icon-">{{literals.favorite}}</a>\
                    <a href="" class="maxui-action maxui-likes {{#liked}}maxui-liked{{/liked}} maxui-icon-">{{literals.like}}</a>\
                    {{#canDeleteActivity}}\
                    <a href="" class="maxui-action maxui-delete maxui-icon-">{{literals.delete_activity_icon}}</a>\
                    <div class="maxui-popover left">\
                        <div class="maxui-arrow"></div>\
                            <h3 class="maxui-popover-title">{{literals.delete_activity_confirmation}}</h3>\
                            <div class="maxui-popover-content">\
                              <input type="button" class="maxui-button-delete" value="{{literals.delete_activity_delete}}">\
                              <input type="button" class="maxui-button-cancel" value="{{literals.delete_activity_cancel}}">\
                            </div>\
                    </div>\
                    {{/canDeleteActivity}}\
        \
                </div>\
            </div>\
        \
            <div class="maxui-comments" style="display: none">\
                <div class="maxui-commentsbox">\
                    {{#replies}}\
                        {{> comment}}\
                    {{/replies}}\
                </div>\
                <div class="maxui-newcommentbox">\
                        <textarea class="maxui-empty maxui-text-input" id="maxui-commentBox" data-literal="{{literals.new_comment_text}}">{{literals.new_comment_text}}</textarea>\
                        <input disabled="disabled" type="button" class="maxui-button maxui-disabled" value="{{literals.new_comment_post}}"/>\
                </div>\
            </div>\
        \
            <div class="maxui-clear"></div>\
        </div>\
            '),

    comment: Hogan.compile('\
<div class="maxui-comment" id="{{id}}" userid="{{actor.id}}" displayname="{{actor.username}}">\
            <div class="maxui-activity-content">\
               <span class="maxui-publisheddate">{{date}}</span>\
               <div class="maxui-actor">\
                   <a href="#">\
                       <span class="maxui-avatar maxui-little"><img src="{{avatarURL}}"></span>\
                       <span class="maxui-displayname">{{actor.displayName}}</span></a>\
                     <span class="maxui-username">{{actor.username}}</span>\
               </div>\
               <div>\
                   <p class="maxui-body">{{&text}}</p>\
                   {{#canDeleteComment}}\
                   <span class="maxui-delete-comment maxui-icon-"></span>\
                   <div class="maxui-popover left">\
                        <div class="maxui-arrow"></div>\
                            <h3 class="maxui-popover-title">{{literals.delete_activity_confirmation}}</h3>\
                            <div class="maxui-popover-content">\
                              <input type="button" class="maxui-button-delete" value="{{literals.delete_activity_delete}}">\
                              <input type="button" class="maxui-button-cancel" value="{{literals.delete_activity_cancel}}">\
                            </div>\
                   </div>\
                   {{/canDeleteComment}}\
               </div>\
            </div>\
        </div>\
            '),

    conversation: Hogan.compile('\
<div class="maxui-conversation" id="{{id}}" data-displayname="{{displayName}}">\
            <div class="maxui-activity-content">\
                <div class="maxui-topright">\
                    <span class="maxui-publisheddate">{{date}}</span>\
                    <a class="maxui-enterconversation maxui-icon-" href="#"></a>\
                </div>\
                <div class="maxui-actor">\
                      <a href="#"><span class="maxui-avatar maxui-big"><img src="{{avatarURL}}"></span>\
                      <span class="maxui-displayname">{{displayName}}</span></a>\
                      <span class="maxui-message-count">{{messages}}</span>\
                </div>\
                <div>\
                    <p class="maxui-body">{{&text}}</p>\
                </div>\
            </div>\
        \
            <div class="maxui-clear"></div>\
        </div>\
            '),

    conversationSettings: Hogan.compile('\
<div id="maxui-{{panelID}}" {{#canManage}}class="maxui-owner"{{/canManage}}>\
          <span class="maxui-avatar maxui-big"><img src="{{conversationAvatarURL}}"></span>\
          <div id="maxui-conversation-displayname-edit">\
              <input type="text" class="maxui-displayname" value="{{displayName}}"/>\
              <i class="maxui-icon-cancel-circled"></i>\
              <i class="maxui-icon-ok-circled"></i>\
          </div>\
          <span class="maxui-displayname">{{displayName}}</span>\
          <span class="maxui-published">{{literals.conversations_info_created}} {{published}}</span>\
          <div class="maxui-participants">\
            <h4>{{literals.conversations_info_participants}}</h4>\
            <ul>\
              {{#participants}}\
              <li class="maxui-participant {{#owner}}maxui-owner{{/owner}}" data-username="{{username}}">\
                  <span class="maxui-avatar maxui-little"><img src="{{avatarURL}}"></span>\
                  <span class="maxui-displayname">{{displayName}}\
                      {{#owner}}<label>{{literals.conversations_info_owner}}</label>{{/owner}}\
                      <button class="maxui-button maxui-button-red maxui-conversation-transfer-to">Transfer</button>\
                  </span>\
                  <span class="maxui-username">{{username}}</span>\
              </li>\
              {{/participants}}\
            </ul>\
            {{#canManage}}\
            <div id="maxui-new-participant">\
                <input type="text" class="maxui-text-input"/>\
                <div id="maxui-conversation-predictive" class="maxui-predictive" style="display:none;"><ul></ul></div>\
            </div>\
            {{/canManage}}\
          </div>\
          {{^canManage}}\
          <div id="maxui-conversation-leave">\
              <input type="button" class="maxui-button maxui-button-red maxui-button-wide" value="{{literals.conversations_info_leave}}">\
          </div>\
          {{/canManage}}\
          {{#canManage}}\
          <div id="maxui-conversation-transfer">\
              <input type="button" class="maxui-button maxui-button-red maxui-button-wide" value="{{literals.conversations_info_transfer}}">\
              <p>{{literals.conversations_info_transfer_help}}</p>\
          </div>\
          {{/canManage}}\
        </div>\
            '),

    filters: Hogan.compile('\
{{#filters}}\
            {{#visible}}\
            <div class="maxui-filter maxui-{{type}}" type="{{type}}" value="{{value}}"><span>{{prepend}}{{value}}<a class="maxui-close" href=""><i class="maxui-icon-cancel-circled" alt="tanca"/></a></span></div>\
            {{/visible}}\
        {{/filters}}\
            '),

    mainUI: Hogan.compile('\
<div id="maxui-container">\
        {{#username}}\
         <div id="maxui-mainpanel">\
        \
           <div id="maxui-conversations" style="height:0px; {{showConversations}}">\
               <div id="maxui-common-header" style="height:0px;">\
                  <div id="maxui-back-conversations" class="maxui-togglebar">\
                      <a class="maxui-icon-" href="#"> {{literals.conversations_list}}\
                      <h3 class="maxui-title">displayName</h3></a>\
                      <input type="button" class="maxui-button" id="maxui-conversation-info" value="{{literals.conversations_info}}">\
                  </div>\
               </div>\
               <div class="maxui-wrapper">\
                   <div id="maxui-conversations-list" class="maxui-activities">\
                       <span id="maxui-info">{{literals.no_conversations}}<span>\
                   </div>\
        \
                   <div id="maxui-messages" style="{{messagesStyle}}">\
                       <div id="maxui-message-list">\
                       </div>\
                   </div>\
                </div>\
                   <div id="maxui-scrollbar">\
                          <div class="maxui-dragger handle"/>\
                   </div>\
           </div>\
        \
        <div id="maxui-show-conversations" class="maxui-togglebar maxui-icon-" style="{{showConversationsToggle}}"><a href="#">{{literals.conversations}}</a></div>\
        \
            <div id="maxui-conversation-predictive" class="maxui-predictive" style="display:none;"><ul></ul></div>\
            <div id="maxui-add-people-box" style="display:none;">\
                <div>\
                  <label class="maxui-label">{{literals.participants}}: <span class="maxui-count">(1/20)</span></label>\
                  <input tabindex="20" type="text" data-literal="{{literals.search_people}}" value="{{literals.search_people}}" class="maxui-text-input" id="add-user-input">\
                </div>\
                <div id="maxui-new-participants" style="display:none;"></div>\
                <div id="maxui-new-displayName" style="display:none;">\
                    <label class="maxui-label">{{literals.conversation_name}}: </label>\
                    <input tabindex="21" type="text" class="maxui-simple-text-input"/>\
                </div>\
            </div>\
        \
           <div id="maxui-newactivity">\
           </div>\
        \
           <div id="maxui-search" class="folded">\
               <a id="maxui-search-toggle" class="maxui-disabled maxui-icon-" href="#" alt="obre-tanca"></a>\
               <a href="#" id="maxui-favorites-filter" title="{{literals.favorites_filter_hint}}"><i class="maxui-icon-star"/></a>\
               <div id="maxui-search-box">\
                  <input id="maxui-search-text" type="search" data-literal="{{literals.search_text}}" class="maxui-empty maxui-text-input" value="{{literals.search_text}}" />\
               </div>\
               <div id="maxui-search-filters"></div>\
           </div>\
        \
           <div id="maxui-show-timeline" class="maxui-togglebar maxui-icon-" style="{{showTimelineToggle}}"><a href="#">{{literals.activity}}</a></div>\
        \
              <div id="maxui-activity-sort">\
                <a class="maxui-sort-action maxui-most-recent active" href="#">{{literals.recent_activity}}</a>\
                /\
                <a class="maxui-sort-action maxui-most-valued" href="#">{{literals.valued_activity}}</a>\
              </div>\
           <div id="maxui-timeline" style="{{showTimeline}}">\
              <div class="maxui-wrapper">\
                  <div id="maxui-preload" class="maxui-activities" style="height:0px;overflow:hidden">\
                      <div class="maxui-wrapper">\
                      </div>\
                  </div>\
                  <div id="maxui-activities" class="maxui-activities">\
                  </div>\
                  <div id="maxui-more-activities">\
                      <input type="button" class="maxui-button" value="{{literals.load_more}}">\
                  </div>\
              </div>\
           </div>\
           <div id="maxui-overlay-background" class="maxui-overlay">\
           </div>\
           <div id="maxui-overlay-wrapper" class="maxui-overlay">\
               <div id="maxui-overlay-panel">\
                   <div id="maxui-overlay-header">\
                        <h3 id="maxui-overlay-title">I\'m a overlay</h3>\
                        <i class="maxui-close maxui-icon-cancel"/>\
                   </div>\
                   <div id="maxui-overlay-content">\
                   </div>\
               </div>\
           </div>\
          </div>\
         </div>\
        {{/username}}\
        {{^username}}\
          No s\'ha definit cap usuari\
        {{/username}}\
        </div>\
            '),

    message: Hogan.compile('\
<div class="maxui-message {{origin}}" id="{{id}}">\
            <div class="maxui-activity-content">\
                <span class="maxui-avatar maxui-little"><img src="{{avatarURL}}"></span>\
                <div class="maxui-balloon">\
                    <p class="maxui-body">{{&text}}</p>\
                    <span class="maxui-publisheddate">{{date}}</span>\
                </div>\
            </div>\
            <div class="maxui-clear"></div>\
        </div>\
            '),

    participant: Hogan.compile('\
  <li class="maxui-participant {{#owner}}maxui-owner{{/owner}}" data-username="{{username}}">\
              <span class="maxui-avatar maxui-little"><img src="{{avatarURL}}"></span>\
              <span class="maxui-displayname">{{displayName}}\
                  {{#owner}}<label>{{literals.conversations_info_owner}}</label>{{/owner}}\
                  <button class="maxui-button maxui-button-red maxui-conversation-transfer-to">Transfer</button>\
                  <button class="maxui-button maxui-button-green maxui-conversation-add-user">Add</button>\
                  <button class="maxui-button maxui-button-red maxui-conversation-dont-add-user">Cancel</button>\
              </span>\
              <span class="maxui-username">{{username}}</span>\
          </li>\
            '),

    participants: Hogan.compile('\
{{#persons}}\
        <div class="maxui-filter maxui-participant" type="participant" username="{{username}}"><span>{{prepend}}{{username}}<a class="maxui-close" href=""><i class="maxui-icon-cancel-circled" alt="tanca"/></a></span></div>\
        {{/persons}}\
            '),

    postBox: Hogan.compile('\
      <a href="#" class="maxui-avatar maxui-big">\
                  <img src="{{avatar}}">\
              </a>\
              <div id="maxui-newactivity-box">\
                   <textarea class="maxui-empty maxui-text-input" data-literal="{{textLiteral}}">{{textLiteral}}</textarea>\
                   <div class="maxui-error-box"></div>\
                   <input disabled="disabled" type="button" class="maxui-button maxui-disabled" value="{{buttonLiteral}}">\
              </div>\
            '),

    predictive: Hogan.compile('\
<li data-username="{{username}}" class="{{cssclass}}">\
        {{displayName}}\
        </li>\
            ')

    };

    return templates;
};