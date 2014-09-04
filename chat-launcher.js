YUI().use(
	'aui-base',
	'aui-popover',
	'event-outside',
	'event-tap',
	function (A) {
		var Lang = A.Lang,

			CONVERT_TAGS = ['SPAN'],

			MOBILE = A.UA.mobile,

			TPL_SKYPE_ICON = '<img alt="" src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20version%3D%221.1%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%20216%20146%22%20xml%3Aspace%3D%22preserve%22%3E%3Cpath%20d%3D%22m%20204.2%2094%20c%201.5%20-7.2%202.2%20-14.2%202.2%20-21%200%20-13.3%20-2.6%20-26.1%20-7.8%20-38.3%20C%20193.5%2022.6%20186.5%2012.1%20177.7%203.3%20168.9%20-5.5%20158.4%20-12.5%20146.2%20-17.7%20c%20-12.2%20-5.2%20-24.9%20-7.8%20-38.3%20-7.8%20-6.8%200%20-13.8%200.7%20-21%202.2%20-9.7%20-7.5%20-20.6%20-11.2%20-32.7%20-11.2%20-14.8%200%20-27.5%205.2%20-38%2015.7%20C%205.8%20-8.2%200.5%204.5%200.5%2019.3%20c%200%2012.1%203.7%2023%2011.2%2032.7%20-1.5%207.2%20-2.2%2014.2%20-2.2%2021%200%2013.3%202.6%2026.1%207.8%2038.3%205.2%2012.2%2012.2%2022.7%2021%2031.5%208.8%208.8%2019.3%2015.8%2031.5%2021%2012.2%205.2%2024.9%207.8%2038.3%207.8%206.8%200%2013.8%20-0.7%2021%20-2.2%209.7%207.5%2020.6%2011.2%2032.7%2011.2%2014.8%200%2027.5%20-5.2%2038%20-15.7%2010.5%20-10.5%2015.7%20-23.1%2015.7%20-38%20-0%20-12.1%20-3.7%20-23%20-11.2%20-32.7%20z%20m%20-44.2%2020.8%20c%20-3.1%205.5%20-7.2%209.8%20-12.4%2013.1%20-5.2%203.3%20-10.9%205.8%20-17.1%207.5%20-6.2%201.7%20-12.8%202.6%20-19.6%202.6%20-15.8%200%20-29.3%20-3.1%20-40.7%20-9.2%20-11.4%20-6.1%20-17.1%20-13.4%20-17.1%20-22%200%20-4.2%201.2%20-7.7%203.6%20-10.5%202.4%20-2.8%205.9%20-4.2%2010.6%20-4.2%202.7%200%205.2%200.7%207.6%202.2%202.3%201.5%204.5%203.3%206.4%205.4%202%202.1%204.1%204.2%206.4%206.3%202.3%202.1%205.3%203.9%209.1%205.4%203.8%201.5%208%202.2%2012.8%202.2%206.1%200%2011%20-1.2%2014.7%20-3.6%203.7%20-2.4%205.6%20-5.4%205.6%20-9%200%20-3.7%20-1.5%20-6.5%20-4.5%20-8.4%20-2%20-1.3%20-7.3%20-3%20-15.7%20-5%20L%2089.2%2082.6%20C%2083.6%2081.2%2078.8%2079.7%2074.8%2078%2070.8%2076.3%2067.1%2074%2063.6%2071.2%20c%20-3.4%20-2.8%20-6.1%20-6.3%20-7.8%20-10.6%20-1.8%20-4.2%20-2.7%20-9.2%20-2.7%20-14.9%200%20-6.8%201.6%20-12.8%204.7%20-18%203.1%20-5.2%207.3%20-9.2%2012.4%20-12.2%205.2%20-2.9%2010.7%20-5.1%2016.7%20-6.6%206%20-1.4%2012.1%20-2.2%2018.5%20-2.2%209%200%2017.4%201.1%2025.5%203.2%208%202.1%2014.6%205.3%2019.9%209.4%205.2%204.2%207.8%208.8%207.8%2013.9%200%204.2%20-1.3%207.8%20-4%2010.8%20-2.7%203%20-6.2%204.5%20-10.6%204.5%20-2.4%200%20-4.7%20-0.6%20-6.7%20-1.7%20-2.1%20-1.1%20-3.9%20-2.5%20-5.6%20-4.1%20-1.7%20-1.6%20-3.5%20-3.1%20-5.3%20-4.7%20-1.9%20-1.5%20-4.4%20-2.9%20-7.5%20-4%20-3.2%20-1.1%20-6.8%20-1.7%20-10.8%20-1.7%20-13.4%200%20-20.1%203.6%20-20.1%2010.8%200%201.6%200.4%203%201%204.2%200.7%201.2%201.5%202.2%202.3%202.9%200.8%200.7%202.2%201.5%204.2%202.2%202%200.7%203.6%201.3%204.9%201.6%201.3%200.3%203.4%200.8%206.2%201.5%20l%2014.5%203.4%20c%204.6%201%208.6%202.1%2012.2%203.2%203.6%201.1%207.4%202.7%2011.5%204.8%204.1%202.1%207.5%204.3%2010.2%206.9%202.7%202.5%205%205.7%206.8%209.6%201.8%203.9%202.7%208.1%202.7%2012.8%20-0%206.8%20-1.5%2012.9%20-4.6%2018.4%20z%22%20style%3D%22fill%3A%2300afff%3Bfill-opacity%3A1%22%2F%3E%3C%2Fsvg%3E" />',

			TPL_CHAT_LINK = '<a href="{href}" style="display: block; padding: 5px;">{type}</a>',

			TPL_CHAT_LINK_GROUP = '<div>' +
				'<div style="border-bottom: 1px solid #DDD; color: #AAA; min-width: 100px; padding-bottom: 3px;">{label}:</div>' +
				'{chatLinks}' +
			'</div>',

			TPL_TRIGGER = '<a class="{cssClass}" href="javascript:;" id="{id}" data-chatlauncher="{chatLauncher}">{content}</a>';

		var ChatLauncher = A.Component.create(
			{
				NAME: 'chatlauncher',

				EXTENDS: A.Base,

				prototype: {
					EMAIL_SCHEMA: {
						groupLabelFn: '_emailGroupLabelFn',
						types: ['email'],
						URIFn: '_emailURIFn'
					},

					SKYPE_NUMBER_SCHEMA: {
						groupLabelFn: '_skypeGroupLabelFn',
						types: ['sms', 'call'],
						URIFn: '_skypeURIFn'
					},

					SKYPE_SCHEMA: {
						groupLabelFn: '_skypeGroupLabelFn',
						types: ['chat', 'call'],
						URIFn: '_skypeURIFn'
					},

					SMS_SCHEMA: {
						groupLabelFn: '_SMSGroupLabelFn',
						types: ['sms'],
						URIFn: '_SMSURIFn'
					},

					initializer: function(config) {
						var instance = this;

						instance._renderTriggerUI();

						instance._bindTriggerUI();
					},

					_adjustLabelCase: function(label) {
						if (label !== 'sms') {
							label = label.charAt(0).toUpperCase() + label.slice(1);
						}
						else {
							label = label.toUpperCase();
						}

						return label;
					},

					_bindPopoverUI: function(popover) {
						var instance = this;

						popover.get('boundingBox').on('mouseleave', instance._hidePopoverTask, instance);
					},

					_bindTriggerUI: function() {
						var instance = this,
							triggers = instance._triggers;

						var syncPopeverEvent = MOBILE ? 'tap' : 'mouseenter';

						if (triggers) {
							triggers.on(syncPopeverEvent, A.bind(instance._syncPopoverHandler, instance));

							if (!MOBILE) {
								triggers.on('mouseleave', A.bind(instance._onLinkMouseLeave, instance));
							}
						}
					},

					_clearHideTimeout: function() {
						var instance = this;

						var timeout = instance._hidePopoverTimeout;

						if (timeout) {
							timeout.cancel();

							instance._hidePopoverTimeout = null;
						}
					},

					_emailGroupLabelFn: function() {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							label,
							name = chatLinkData.html;

						if (name) {
							label = name;

							label+= ' (' + chatLinkData.email + ')';
						}
						else {
							label = chatLinkData.email;
						}

						return label;
					},

					_emailURIFn: function(type) {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							uri = ['mailto:'];

						uri.push(chatLinkData.email);

						return uri.join('');
					},

					_getChatLink: function(type) {
						var instance = this,
							schema = instance._currentSchema;

						var href = instance[schema.URIFn](type);

						return Lang.sub(
							TPL_CHAT_LINK,
							{
								href: href,
								type: instance._adjustLabelCase(type)
							}
						);
					},

					_getChatLinkData: function(node) {
						var instance = this;

						var chatLinkData = {
							displayName: node.attr('data-displayname'),
							email: node.attr('data-chatemail'),
							html: node.html(),
							number: node.attr('data-chatnumber'),
							topic: node.attr('data-chattopic'),
							users: node.attr('data-chatlauncher')
						};

						instance._chatLinkData = chatLinkData;

						return chatLinkData;
					},

					_getChatLinkGroup: function(client) {
						var instance = this,
							content = [],
							schema = instance._setCurrentSchema(client),
							types = schema.types;

						label = instance[schema.groupLabelFn]();

						for (var i = 0; i < types.length; i++) {
							content.push(instance._getChatLink(types[i]));
						}

						return Lang.sub(
							TPL_CHAT_LINK_GROUP,
							{
								label: label,
								chatLinks: content.join('')
							}
						);
					},

					_getPopover: function(node) {
						var instance = this;
							popover = instance._popover;

						if (!popover) {
							popover = new A.Popover(
								{
									align: {
										points: [A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC]
									},
									constrain: true,
									position: 'right',
									zIndex: 1
								}
							);

							if (!MOBILE) {
								instance._bindPopoverUI(popover);
							}
							else {
								A.Event.defineOutside('touchend');
							}

							instance._popover = popover;
						}

						return popover;
					},

					_getPopoverBodyContent: function(chatLinkData) {
						var instance = this,
							content = [];

						if (chatLinkData.users) {
							content.push(instance._getChatLinkGroup('skype'));
						}

						if (chatLinkData.number) {
							content.push(instance._getChatLinkGroup('skypeNumber'));

							if (MOBILE) {
								content.push(instance._getChatLinkGroup('sms'));
							}
						}

						if (chatLinkData.email) {
							content.push(instance._getChatLinkGroup('email'));
						}

						return content.join('');
					},

					_getSkypeUserData: function(skypeType) {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							userData;

						if (skypeType) {
							userData = chatLinkData.users;
						}
						else {
							userData = chatLinkData.number;
						}

						return userData;
					},

					_hasMultipleParticipants: function(users) {
						return users.match(',');
					},

					_hidePopover: function() {
						var instance = this;
							popover = instance._getPopover();

						instance._clearHideTimeout();

						if (!popover.get('boundingBox').test(':hover')) {
							popover.hide();
						}
					},

					_hidePopoverTask: function() {
						var instance = this;

						if (!instance._hidePopoverTimeout) {
							instance._hidePopoverTimeout = A.later(300, instance, instance._hidePopover);
						}
					},

					_isSkypeUserName: function() {
						var instance = this,
							client = instance._currentClient;

						return (client === 'skype');
					},

					_onLinkMouseLeave: function(event) {
						var instance = this;

						instance._hidePopoverTask();
					},

					_renderTriggerUI: function() {
						var instance = this;

						var triggers = A.all('[data-chatemail], [data-chatlauncher], [data-chatnumber]');

						triggers.each(
							function(item, index) {
								if (instance._validateTag(item)) {
									var itemAttrs = {
										chatLauncher: item.attr('data-chatlauncher'),
										content: item.html(),
										cssClass: item.attr('class'),
										id: item.attr('id')
									};

									var anchor = A.Node.create(Lang.sub(TPL_TRIGGER, itemAttrs));

									var chatEmail = item.attr('data-chatemail');

									if (chatEmail) {
										anchor.attr('data-chatemail', chatEmail);
									}

									var chatNumber = item.attr('data-chatnumber');

									if (chatNumber) {
										anchor.attr('data-chatnumber', chatNumber);
									}

									var chatTopic = item.attr('data-chattopic');

									if (chatTopic) {
										anchor.attr('data-chattopic', chatTopic);
									}

									item.replace(anchor);

									triggers._nodes[index] = anchor;
								}
							}
						);

						instance._triggers = triggers;
					},

					_setCurrentSchema: function(client) {
						var instance = this,
							schema;

						if (client === 'email') {
							schema = instance.EMAIL_SCHEMA;
						}
						else if (client === 'skype') {
							schema = instance.SKYPE_SCHEMA;
						}
						else if (client === 'skypeNumber') {
							schema = instance.SKYPE_NUMBER_SCHEMA;
						}
						else if (client === 'sms') {
							schema = instance.SMS_SCHEMA;
						}

						instance._currentClient = client;
						instance._currentSchema = schema;

						return schema;
					},

					_setHideHandler: function(popover) {
						var instance = this;

						if (!instance._hideHandler) {
							instance._hideHandler = popover.get('boundingBox').on(
								'touchendoutside',
								function(event) {
									var target = event.target;

									if (!target.hasAttribute('data-chatlauncher') && !target.ancestor('.popover', true, 'body')) {
										instance._hidePopover();

										instance._hideHandler.detach();
										instance._hideHandler = null;
									}
								}
							);
						}
					},

					_skypeGroupLabelFn: function() {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							label = TPL_SKYPE_ICON + ' ',
							userName = instance._isSkypeUserName(),
							userData = instance._getSkypeUserData(userName);

						if (instance._hasMultipleParticipants(userData)) {
							if (userName) {
								var topic = chatLinkData.topic;

								topic = (topic && topic !== 'false') ? topic : chatLinkData.html;

								label+= instance._adjustLabelCase(topic);
							}
							else {
								label+= 'Phone Numbers';
							}
						}
						else {
							label+= userData;
						}

						return label;
					},

					_skypeURIFn: function(type) {
						var instance = this,
							chatLinkData = instance._chatLinkData,
							conferenceTopic,
							topic = chatLinkData.topic,
							uri = ['skype:'],
							userData = instance._getSkypeUserData(instance._isSkypeUserName());

						if (instance._hasMultipleParticipants(userData)) {
							userData = userData.replace(/,/g, ';');

							if (topic != 'false') {
								conferenceTopic = topic;
							}
						}

						uri.push(userData + '?' + type);

						if (conferenceTopic) {
							uri.push('&topic=' + encodeURI(conferenceTopic));
						}

						return uri.join('');
					},

					_SMSGroupLabelFn: function() {
						return 'SMS (Native)';
					},

					_SMSURIFn: function(type) {
						return 'sms:' + this._chatLinkData.number;
					},

					_syncPopover: function(event) {
						var instance = this,
							currentTarget = event.currentTarget,
							popover = instance._getPopover(),
							triggerId = currentTarget.guid();

						if (triggerId != instance._activeId) {
							var chatLinkData = instance._getChatLinkData(currentTarget);

							popover.setAttrs(
								{
									'align.node': currentTarget,
									bodyContent: instance._getPopoverBodyContent(chatLinkData),
									headerContent: (chatLinkData.displayName || null)
								}
							);

							instance._activeId = triggerId;

							event.halt();
						}

						if (!popover.get('rendered')) {
							popover.render();
						}
						else {
							popover.show();
						}

						popover.align();

						instance._setHideHandler(popover);
					},

					_syncPopoverHandler: function(event) {
						var instance = this;

						instance._clearHideTimeout();

						instance._syncPopover(event);
					},

					_validateTag: function(node) {
						var instance = this;

						return CONVERT_TAGS.indexOf(node.get('nodeName')) !== -1;
					}
				}
			}
		);

		new ChatLauncher();
	}
);