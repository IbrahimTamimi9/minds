elgg.provide('elgg.ui');

elgg.ui.init = function () {
	elgg.ui.initHoverMenu();

	//if the user clicks a system message, make it disappear
	$('.elgg-system-messages li').live('click', function() {
		$(this).stop().fadeOut('fast');
	});

	$('.elgg-system-messages li').animate({opacity: 0.9}, 6000);
	$('.elgg-system-messages li').fadeOut('slow');

	$('.elgg-toggler').live('click', elgg.ui.toggles);

	$('[rel=popup]').live('click', elgg.ui.popsUp);

	$('.elgg-menu-page .elgg-menu-parent').live('click', elgg.ui.toggleMenu);

	$('.elgg-requires-confirmation').live('click', elgg.ui.requiresConfirmation);

	if ($('.elgg-input-date').length) {
		$('.elgg-input-date').datepicker();
	}
}

/**
 * Toggles an element based on clicking a separate element
 *
 * Use .elgg-toggler on the toggler element
 * Set the href to target the item you want to toggle (<a class="elgg-toggler" href="#id-of-target">)
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.toggles = function(event) {
	event.preventDefault();

	var target = $(this).toggleClass('elgg-state-active').attr('href');

	$(target).slideToggle('medium');
}

/**
 * Pops up an element based on clicking a separate element
 *
 * Set the rel="popup" on the popper and set the href to target the
 * item you want to toggle (<a rel="popup" href="#id-of-target">)
 *
 * This function emits the getOptions, ui.popup hook that plugins can register for to provide custom
 * positioning for elements.  The handler is passed the following params:
 *	targetSelector: The selector used to find the popup
 *	target:         The popup jQuery element as found by the selector
 *	source:         The jquery element whose click event initiated a popup.
 *	
 * The return value of the function is used as the options object to .position().
 * Handles can also return false to abort the default behvior and override it with their own.
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.popsUp = function(event) {
	event.preventDefault();

	var target = elgg.getUrlFragment($(this).toggleClass('elgg-state-active').attr('href'));
	var $target = $(target);

	// emit a hook to allow plugins to position and control popups
	var params = {
		targetSelector: target,
		target: $target,
		source: $(this)
	};

	var options = {
		my: 'center top',
		at: 'center bottom',
		of: $(this)
	}

	options = elgg.trigger_hook('getOptions', 'ui.popup', params, options);

	// allow plugins to cancel event
	if (!options) {
		return;
	}

	// hide if already open
	if ($target.is(':visible')) {
		$target.fadeOut();
		return;
	}

	$target.appendTo('body')
		.fadeIn()
		.position(options);
}

/**
 * Toggles a child menu when the parent is clicked
 *
 * @param {Object} event
 * @return void
 */
elgg.ui.toggleMenu = function(event) {
	$(this).siblings().slideToggle('medium');
	$(this).toggleClass('elgg-menu-closed elgg-menu-opened');
	event.preventDefault();
}

/**
 * Initialize the hover menu
 *
 * @param {Object} parent
 * @return void
 */
elgg.ui.initHoverMenu = function(parent) {
	if (!parent) {
		parent = document;
	}

	// avatar image menu link
	$(parent).find(".elgg-avatar").live('mouseover', function() {
		$(this).children(".elgg-icon-hover-menu").show();
	})
	.live('mouseout', function() {
		$(this).children(".elgg-icon-hover-menu").hide();
	});


	// avatar contextual menu
	$(".elgg-avatar > .elgg-icon-hover-menu").live('click', function(e) {
		// check if we've attached the menu to this element already
		var $hovermenu = $(this).data('hovermenu') || null;

		if (!$hovermenu) {
			var $hovermenu = $(this).parent().find(".elgg-menu-hover");
			$(this).data('hovermenu', $hovermenu);
		}

		// close hovermenu if arrow is clicked & menu already open
		if ($hovermenu.css('display') == "block") {
			$hovermenu.fadeOut();
		} else {
			$avatar = $(this).closest(".elgg-avatar");

			// @todo Use jQuery-ui position library instead -- much simpler
			var offset = $avatar.offset();
			var top = $avatar.height() + offset.top + 'px';
			var left = $avatar.width() - 15 + offset.left + 'px';

			$hovermenu.appendTo('body')
					.css('position', 'absolute')
					.css("top", top)
					.css("left", left)
					.fadeIn('normal');
		}

		// hide any other open hover menus
		$(".elgg-menu-hover:visible").not($hovermenu).fadeOut();
	});

	// hide avatar menu when user clicks elsewhere
	$(document).click(function(event) {
		if ($(event.target).parents(".elgg-avatar").length == 0) {
			$(".elgg-menu-hover").fadeOut();
		}
	});
}

/**
 * Calls a confirm() and prevents default if denied.
 *
 * @param {Object} e
 * @return void
 */
elgg.ui.requiresConfirmation = function(e) {
	var confirmText = $(this).attr('title') || elgg.echo('question:areyousure');
	if (!confirm(confirmText)) {
		e.preventDefault();
	}
};

/**
 * Repositions the likes popup
 *
 * @param {String} hook    'getOptions'
 * @param {String} type    'ui.popup'
 * @param {Object} params  An array of info about the target and source.
 * @param {Object} options Options to pass to
 *
 * @return {Object}
 */
elgg.ui.likesPopupHandler = function(hook, type, params, options) {
	if (params.target.hasClass('elgg-likes-list')) {
		options.my = 'right bottom';
		options.at = 'left top';
		return options;
	}
	return null;
};

elgg.register_hook_handler('init', 'system', elgg.ui.init);
elgg.register_hook_handler('getOptions', 'ui.popup', elgg.ui.likesPopupHandler);