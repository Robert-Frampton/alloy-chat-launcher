YUI().use(
	'aui-base',
	'aui-popover',
	'event-hover',
	'event-touch',
	'event-outside',
	function (A) {
		var INVALID_TAGS = ['A', 'BUTTON', 'INPUT'];

		var TPL_POPOVER_BODY = '<div><a class="chat-link" href="skype:{userName}?chat">Chat</a></div>' +
			'<div><a class="call-link" href="skype:{userName}?call">Call</a></div>';

		var TPL_LINK = '<a href="{href}" style="display: block; padding: 5px;">{type}</a>';

		var SKYPE_ICON = '<img alt="" src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3C%21--%20Created%20with%20Inkscape%20%28http%3A%2F%2Fwww.inkscape.org%2F%29%20--%3E%0A%0A%3Csvg%0A%20%20%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%0A%20%20%20xmlns%3Acc%3D%22http%3A%2F%2Fcreativecommons.org%2Fns%23%22%0A%20%20%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%0A%20%20%20xmlns%3Asvg%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%0A%20%20%20version%3D%221.1%22%0A%20%20%20width%3D%2220%22%0A%20%20%20height%3D%2220%22%0A%20%20%20viewBox%3D%220%200%20216%20146%22%0A%20%20%20id%3D%22Capa_1%22%0A%20%20%20xml%3Aspace%3D%22preserve%22%3E%3Cmetadata%0A%20%20%20%20%20id%3D%22metadata9%22%3E%3Crdf%3ARDF%3E%3Ccc%3AWork%0A%20%20%20%20%20%20%20%20%20rdf%3Aabout%3D%22%22%3E%3Cdc%3Aformat%3Eimage%2Fsvg%2Bxml%3C%2Fdc%3Aformat%3E%3Cdc%3Atype%0A%20%20%20%20%20%20%20%20%20%20%20rdf%3Aresource%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fdcmitype%2FStillImage%22%20%2F%3E%3Cdc%3Atitle%3E%3C%2Fdc%3Atitle%3E%3C%2Fcc%3AWork%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cdefs%0A%20%20%20%20%20id%3D%22defs7%22%20%2F%3E%3Cpath%0A%20%20%20%20%20d%3D%22m%20204.18888%2C94.021882%20c%201.49014%2C-7.179428%202.23692%2C-14.173448%202.23692%2C-20.980342%200%2C-13.333959%20-2.58542%2C-26.085942%20-7.7614%2C-38.254231%20C%20193.49014%2C22.61902%20186.49612%2C12.129707%20177.68406%2C3.3176545%20168.872%2C-5.4943982%20158.3827%2C-12.488418%20146.2144%2C-17.664404%20c%20-12.17%2C-5.172553%20-24.91855%2C-7.761404%20-38.25422%2C-7.761404%20-6.8069%2C0%20-13.80092%2C0.746784%20-20.980348%2C2.238635%20-9.697893%2C-7.459257%20-20.607808%2C-11.189745%20-32.729746%2C-11.189745%20-14.82581%2C0%20-27.483372%2C5.244657%20-37.9744%2C15.73397%20C%205.7846562%2C-8.15192%200.54%2C4.5056423%200.54%2C19.331453%20c%200%2C12.121937%203.730487%2C23.031852%2011.189744%2C32.729745%20-1.491851%2C7.179428%20-2.2386351%2C14.173448%20-2.2386351%2C20.980342%200%2C13.332242%202.5871351%2C26.084225%207.7614051%2C38.25423%205.174269%2C12.16829%2012.168288%2C22.6576%2020.980341%2C31.46965%208.812053%2C8.81206%2019.303082%2C15.80436%2031.471371%2C20.98034%2012.16829%2C5.176%2024.920272%2C7.76313%2038.254234%2C7.76313%206.80689%2C0%2013.80091%2C-0.7485%2020.98378%2C-2.24035%209.69446%2C7.46098%2020.60436%2C11.19146%2032.7263%2C11.19146%2014.82582%2C0%2027.4851%2C-5.24638%2037.97098%2C-15.73568%2010.49102%2C-10.48932%2015.73568%2C-23.14688%2015.73568%2C-37.97441%20-0.001%2C-12.12022%20-3.73048%2C-23.03013%20-11.18632%2C-32.728028%20z%20m%20-44.20274%2C20.770898%20c%20-3.0747%2C5.45582%20-7.20174%2C9.81463%20-12.37602%2C13.07817%20-5.17598%2C3.26353%20-10.88588%2C5.75624%20-17.13312%2C7.48157%20-6.24723%2C1.72362%20-12.7743%2C2.58886%20-19.58119%2C2.58886%20-15.758006%2C0%20-29.323725%2C-3.0541%20-40.700594%2C-9.16399%20-11.37687%2C-6.10818%20-17.064447%2C-13.44898%20-17.064447%2C-22.02928%200%2C-4.194%201.189705%2C-7.689298%203.567397%2C-10.487592%202.377692%2C-2.798295%205.897018%2C-4.195726%2010.559698%2C-4.195726%202.703874%2C0%205.220622%2C0.746784%207.551962%2C2.238636%202.33134%2C1.491852%204.475554%2C3.289284%206.43436%2C5.387146%201.958807%2C2.097866%204.078987%2C4.195726%206.363974%2C6.293586%202.283272%2C2.09958%205.313327%2C3.89358%209.090166%2C5.38543%203.776844%2C1.49185%208.042954%2C2.23864%2012.800054%2C2.23864%206.06011%2C0%2010.95455%2C-1.18627%2014.68675%2C-3.56397%203.73049%2C-2.38112%205.59487%2C-5.38714%205.59487%2C-9.02321%200%2C-3.730486%20-1.49184%2C-6.52878%20-4.47383%2C-8.393165%20-2.0498%2C-1.30816%20-7.27213%2C-2.98542%20-15.6653%2C-5.03693%20L%2089.218468%2C82.554024%20C%2083.623596%2C81.249298%2078.82186%2C79.735129%2074.811542%2C78.011517%2070.801226%2C76.284472%2067.07074%2C74.025235%2063.621798%2C71.22694%20c%20-3.44894%2C-2.796577%20-6.06011%2C-6.315904%20-7.83179%2C-10.559698%20-1.771682%2C-4.242078%20-2.657522%2C-9.208622%20-2.657522%2C-14.896198%200%2C-6.806894%201.562238%2C-12.796618%204.684997%2C-17.972604%203.122759%2C-5.175986%207.273849%2C-9.232655%2012.448119%2C-12.170006%205.17427%2C-2.937351%2010.745108%2C-5.127918%2016.71423%2C-6.5734173%205.967406%2C-1.4454994%2012.121938%2C-2.168249%2018.461878%2C-2.168249%208.95283%2C0%2017.43526%2C1.0729656%2025.45589%2C3.2171803%208.01892%2C2.144215%2014.6387%2C5.291008%2019.85932%2C9.440381%205.22062%2C4.15109%207.83178%2C8.789735%207.83178%2C13.917653%200%2C4.194008%20-1.32704%2C7.785439%20-3.98628%2C10.769142%20-2.65408%2C2.981986%20-6.17512%2C4.473838%20-10.55798%2C4.473838%20-2.42404%2C0%20-4.66096%2C-0.55966%20-6.71248%2C-1.678977%20-2.0515%2C-1.117601%20-3.91588%2C-2.470397%20-5.59658%2C-4.054952%20-1.67898%2C-1.584556%20-3.45066%2C-3.146794%20-5.31676%2C-4.684997%20-1.86439%2C-1.538204%20-4.38113%2C-2.866964%20-7.54853%2C-3.986282%20-3.17426%2C-1.119318%20-6.76226%2C-1.678977%20-10.77086%2C-1.678977%20-13.426663%2C0%20-20.140854%2C3.587997%20-20.140854%2C10.769142%200%2C1.584555%200.350216%2C2.983703%201.048932%2C4.195725%200.698716%2C1.212022%201.469534%2C2.190566%202.307306%2C2.93735%200.837771%2C0.746785%202.236918%2C1.491852%204.195724%2C2.238636%201.958806%2C0.746784%203.591432%2C1.284126%204.896162%2C1.60859%201.30472%2C0.326182%203.35795%2C0.815454%206.15453%2C1.467818%20l%2014.54598%2C3.356236%20c%204.56997%2C1.026614%208.64725%2C2.09958%2012.24039%2C3.21718%203.58972%2C1.121035%207.43522%2C2.70559%2011.53824%2C4.757101%204.10302%2C2.051511%207.50734%2C4.334781%2010.20948%2C6.853247%202.7056%2C2.518464%204.96484%2C5.709894%206.78458%2C9.579437%201.81976%2C3.871261%202.72792%2C8.137372%202.72792%2C12.798335%20-0.004%2C6.806896%20-1.53992%2C12.939106%20-4.62148%2C18.393206%20z%22%0A%20%20%20%20%20id%3D%22path3%22%0A%20%20%20%20%20style%3D%22fill%3A%2300afff%3Bfill-opacity%3A0.94117647%22%20%2F%3E%3C%2Fsvg%3E" />';

		var TPL_POPOVER_HEADER = '<div style="color: #00AFF0; line-height: 20px;">' +
			SKYPE_ICON +
			'<span style="vertical-align: middle;"> Skype</span>' +
		'</div>';

		var ChatLauncher = A.Component.create(
			{
				NAME: 'chatlauncher',

				EXTENDS: A.Base,

				prototype: {
					initializer: function(config) {
						var instance = this;

						instance._renderTriggers();

						instance._bindUI();
					},

					_bindUI: function() {
						var instance = this,
							links = instance._links;

						if (links) {
							links.on(
								['mouseenter', 'touchstart'],
								A.bind(instance._onLinkMouseEnter, instance)
							);

							links.on(
								'mouseleave',
								A.bind(instance._onLinkMouseLeave, instance)
							);
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

					_getChatLink: function(userData, type, topic) {
						var instance = this,
							href = instance._getSkypeHREF(userData, type, topic);

						return A.Lang.sub(
							TPL_LINK,
							{
								href: href,
								type: type.charAt(0).toUpperCase() + type.slice(1)
							}
						);
					},

					_getPopover: function(node) {
						var instance = this;
							popover = instance._popover;

						if (!popover) {
							var popover = new A.Popover(
								{
									align: {
										points: [A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC]
									},
									constrain: true,
									headerContent: TPL_POPOVER_HEADER,
									position: 'right',
									width: 100,
									zIndex: 1
								}
							);

							var boundingBox = popover.get('boundingBox');

							popover.get('boundingBox').on('mouseleave', instance._hidePopoverTask, instance);

							A.Event.defineOutside('touchstart');
							boundingBox.on('touchstartoutside', function() {
								instance._hidePopover();
							});

							instance._popover = popover;
						}

						return popover;
					},

					_getPopoverBodyContent: function(node, types) {
						var instance = this,
							content = [],
							topic = node.attr('data-chattopic') || node.html(),
							userData = node.attr('data-chatlauncher');

						for (var i = 0; i < types.length; i++) {
							content.push(instance._getChatLink(userData, types[i], topic));
						}

						return content.join('');
					},

					_getSkypeHREF: function(userData, type, topic) {
						var instance = this,
							href = ['skype:'],
							conferenceTopic;

						if (userData.match(',')) {
							userData = userData.replace(',', ';');

							if (topic != 'false') {
								conferenceTopic = topic;
							}
						}

						href.push(userData + '?' + type);

						if (conferenceTopic) {
							href.push('&topic=' + encodeURI(conferenceTopic));
						}

						return href.join('');
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

					_onLinkMouseEnter: function(event) {
						var instance = this,
							currentTarget = event.currentTarget;

						instance._clearHideTimeout();

						instance._syncPopover(currentTarget);
					},

					_onLinkMouseLeave: function(event) {
						var instance = this,
							currentTarget = event.currentTarget;

						instance._hidePopoverTask();
					},

					_renderTriggers: function() {
						var instance = this;

						var links = A.all('[data-chatlauncher]');

						links.each(
							function(item, index) {
								if (instance._validateTag(item)) {
									var anchor = A.Node.create('<a>');

									anchor.html(item.html());

									anchor.attr('data-chatlauncher', item.attr('data-chatlauncher'));
									anchor.attr('href', 'javascript:;');

									item.replace(anchor);

									links._nodes[index] = anchor;
								}
							}
						);

						instance._links = links;
					},

					_syncPopover: function(node) {
						var instance = this,
							popover = instance._getPopover();

						var triggerId = node.guid();

						if (triggerId != instance._activeId) {
							popover.set('align.node', node);

							var content = instance._getPopoverBodyContent(node, ['call', 'chat']);

							popover.set('bodyContent', content);

							instance._activeId = triggerId;
						}

						if (!popover.get('rendered')) {
							popover.render().align();
						}
						else {
							popover.show();
						}
					},

					_validateTag: function(node) {
						var instance = this;

						return INVALID_TAGS.indexOf(node.get('nodeName')) == -1;
					}
				}
			}
		);

		new ChatLauncher();
	}
);