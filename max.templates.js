var max = max || {};

/**
 * @fileoverview Provides hogan compiled templates
 *               ready to render.
 */


max.templates = function() {

// construct and compile templates
var MSTCH_MAXUI_MAIN_UI = '\
<div id="maxui-container">\
{{#username}}\
 <div id="maxui-mainpanel">\
\
   <div id="maxui-conversations" style="height:0px; {{showConversations}}">\
           <div id="maxui-conversations-list" class="maxui-activities">\
               <div class="maxui-wrapper">\
               </div>\
           </div>\
\
           <div id="maxui-messages" style="{{messagesStyle}}">\
               <div id="maxui-back-conversations" class="maxui-togglebar"><a href="#">&larr; {{literals.conversations_list}}</a></div>\
               <div id="maxui-message-list">\
                   <div class="maxui-wrapper">\
                   </div>\
               </div>\
           </div>\
   </div>\
\
<div id="maxui-show-conversations" class="maxui-togglebar" style="{{showConversationsToggle}}"><a href="#">{{literals.conversations}} &uarr;</a></div>\
\
   <div id="maxui-newactivity">\
   </div>\
\
   <div id="maxui-search" class="folded">\
       <a id="maxui-search-toggle" class="maxui-disabled" href="#"><img src="/maxui-dev/img/transparent.gif" alt="obre-tanca" ></a>\
       <div id="maxui-search-box">\
          <input id="maxui-search-text" type="search" data-literal="{{literals.search_text}}" class="maxui-empty maxui-text-input" value="{{literals.search_text}}" />\
          <!--<input disabled="disabled" id="maxui-search-action" type="button" class="maxui-button maxui-disabled"></input>-->\
       </div>\
       <div id="maxui-search-filters"></div>\
   </div>\
\
   <div id="maxui-show-timeline" class="maxui-togglebar" style="{{showTimelineToggle}}"><a href="#">{{literals.activity}} &darr;</a></div>\
\
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
  </div>\
 </div>\
{{/username}}\
{{^username}}\
  No s\'ha definit cap usuari\
{{/username}}\
</div>\
';

var MSTCH_MAXUI_POSTBOX = '\
      <a href="#" class="maxui-avatar">\
          <img src="{{avatar}}">\
      </a>\
      <div id="maxui-newactivity-box">\
           <textarea class="maxui-empty maxui-text-input" data-literal="{{textLiteral}}">{{textLiteral}}</textarea>\
           <input disabled="disabled" type="button" class="maxui-button maxui-disabled" value="{{buttonLiteral}}">\
      </div>\
      <div id="maxui-predictive" style="display:none;"><ul></ul></div>\
';

var MSTCH_MAXUI_ACTIVITY = '\
<div class="maxui-activity" id="{{id}}" userid="{{actor.id}}" username="{{actor.username}}">\
    <div class="maxui-activity-content">\
        <div class="maxui-topright">\
            <span class="maxui-publisheddate">{{date}}</span>\
        </div>\
        <div class="maxui-actor">\
              <a href="{{profileURL}}" {{^enableActorLink}}class="maxui-disabled-link"{{/enableActorLink}}>\
              <span class="maxui-avatar"><img src="{{avatarURL}}"></span>\
		          <span class="maxui-displayname">{{actor.displayName}}</span></a>\
          <span class="maxui-username">{{actor.username}}&nbsp;</span>\
        </div>\
        <div>\
            <p class="maxui-body">{{&text}}</p>\
            {{#canDeleteActivity}}\
            <span class="maxui-delete-activity"></span>\
            {{/canDeleteActivity}}\
        </div>\
    </div>\
    <div class="maxui-footer">\
        {{#publishedIn}}\
        <div class="maxui-origin">\
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
            <a href="" class="maxui-commentaction">\
                 {{#replies}}<strong>{{replies.totalItems}}</strong>{{/replies}}\
                 {{^replies}}<strong>0</strong>{{/replies}}\
                 {{literals.toggle_comments}}\
            </a>\
            \
        </div>\
    </div>\
\
    <div class="maxui-comments" style="display: none">\
        <div class="maxui-commentsbox">\
            {{#replies.items}}\
                {{> comment}}\
            {{/replies.items}}\
        </div>\
        <div class="maxui-newcommentbox">\
                <textarea class="maxui-empty maxui-text-input" id="maxui-commentBox" data-literal="{{literals.new_comment_text}}">{{literals.new_comment_text}}</textarea>\
                <input disabled="disabled" type="button" class="maxui-button maxui-disabled" value="{{literals.new_comment_post}}"/>\
        </div>\
    </div>\
\
    <div class="maxui-clear"></div>\
</div>\
';

var MSTCH_MAXUI_CONVERSATION = '\
<div class="maxui-conversation" id="{{id}}">\
    <div class="maxui-activity-content">\
        <div class="maxui-topright">\
            <span class="maxui-publisheddate">{{date}}</span>\
            <a class="maxui-enterconversation" href="#"><img src="/maxui-dev/img/to_conversation.png"></a>\
        </div>\
        <div class="maxui-actor">\
              <a href="#"><span class="maxui-avatar"><img src="{{avatarURL}}"></span>\
              <span class="maxui-displayname">{{partner}}</span></a>\
              <span class="maxui-message-count">{{messages}}</span>\
        </div>\
        <div>\
            <p class="maxui-body">{{&text}}</p>\
        </div>\
    </div>\
\
    <div class="maxui-clear"></div>\
</div>\
';

var MSTCH_MAXUI_MESSAGE = '\
<div class="maxui-message {{origin}}" id="{{id}}">\
    <div class="maxui-activity-content">\
        <span class="maxui-avatar"><img src="{{avatarURL}}"></span>\
        <div>\
            <p class="maxui-body">{{&text}}</p>\
        </div>\
        <span class="maxui-publisheddate">{{date}}</span>\
    </div>\
    <div class="maxui-clear"></div>\
</div>\
';

var MSTCH_MAXUI_COMMENT = '\
<div class="maxui-comment" id="{{id}}" userid="{{actor.id}}" displayname="{{actor.username}}">\
    <div class="maxui-activity-content">\
        <div class="maxui-publisheddate">{{date}}</div>\
        <div class="maxui-actor">\
	   <a href="#">\
		<span class="maxui-avatar"><img src="{{avatarURL}}"></span>\
		<span class="maxui-displayname">{{actor.displayName}}</span></a> \
	   <span class="maxui-username">{{actor.username}}</span>\
        </div>\
        <div>\
            <p class="maxui-body">{{&text}}</p>\
        </div>\
        <div class="maxui-publisheddate"></div>\
    </div>\
</div>\
';

var MSTCH_MAXUI_PREDICTIVE_ITEM = '\
<li class="{{cssclass}}">\
{{username}}\
</li>\
';


var MSTCH_MAXUI_FILTERS = '\
{{#filters}}\
<div class="maxui-filter maxui-{{type}}" type="{{type}}" value="{{value}}"><span>{{prepend}}{{value}}<a class="close" href=""><img src="/maxui-dev/img/x.png" alt="tanca"></a></span></div>\
{{/filters}}\
';

var templates = {
         mainUI: Hogan.compile(MSTCH_MAXUI_MAIN_UI),
        postBox: Hogan.compile(MSTCH_MAXUI_POSTBOX),
       activity: Hogan.compile(MSTCH_MAXUI_ACTIVITY),
        comment: Hogan.compile(MSTCH_MAXUI_COMMENT),
        filters: Hogan.compile(MSTCH_MAXUI_FILTERS),
   conversation: Hogan.compile(MSTCH_MAXUI_CONVERSATION),
        message: Hogan.compile(MSTCH_MAXUI_MESSAGE),
     predictive: Hogan.compile(MSTCH_MAXUI_PREDICTIVE_ITEM)
  }

  return templates
}