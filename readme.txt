
=== Countdown Timer ===

Contributors:      cb + WordPress Telex
Tags:              block, countdown, timer, event, date
Tested up to:      6.8
Stable tag:        0.1.0
License:           GPLv2 or later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

A countdown timer block with real-time updates, multiple styles, and theme.json integration.

== Description ==

The Countdown Timer block provides a sophisticated way to display time remaining until a future event or time elapsed since a past event. Perfect for product launches, event promotions, or commemorating special dates.

**Key Features:**

* **Real-time Updates** - Countdown updates every second on both frontend and editor
* **Dual Modes** - Switch between countdown (future) and countup (past) modes
* **Native DateTime Picker** - Precise date and time selection with minutes and seconds
* **Four Predefined Styles** - Choose from Classic, Modern, Minimal, or Bold designs
* **Full Theme.json Support** - Customize colors, typography, and spacing through your theme
* **Singleton Architecture** - Efficient, well-structured code following WordPress standards
* **Responsive Design** - Works beautifully on all screen sizes
* **Internationalization Ready** - Fully translatable with proper text domain support

**Technical Highlights:**

* Dynamic block with live preview in editor
* Complete DocBlocks for all functions and classes
* Strict PHP type hints throughout
* WordPress coding standards compliant
* Proper escaping and sanitization
* Block styles registered for theme.json integration

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/gatherpress-countdown` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress
3. Add the Countdown Timer block to any post or page
4. Select your target date and time using the toolbar datetime picker
5. Choose a block style variation that matches your design
6. Customize colors and typography through theme.json or the block inspector

== Frequently Asked Questions ==

= How do I set the countdown date? =

Use the datetime picker in the block toolbar. Click the calendar icon and select your target date and time with precision down to minutes and seconds.

= Can I count up from a past date? =

Yes! The block automatically switches to countup mode when you select a date in the past. Perfect for "days since" counters.

= How do I customize the appearance? =

Choose from four predefined block styles (Classic, Modern, Minimal, Bold) and further customize using theme.json for colors, typography, and spacing.

= Does it update in real-time? =

Absolutely! The countdown updates every second on both the frontend and in the editor preview.

= Is it compatible with my theme? =

Yes! The block fully supports theme.json and respects your theme's color palette, typography settings, and spacing scale.

== Screenshots ==

1. Block in editor with toolbar datetime picker open
2. Classic style countdown showing days, hours, minutes, seconds
3. Modern style with bold numbers and subtle labels
4. Minimal style with clean, simple design
5. Bold style with large, impactful display
6. Block inspector settings and customization options

== Changelog ==

= 0.1.0 =
* Initial release
* Real-time countdown/countup functionality
* Native datetime picker with seconds precision
* Four predefined block styles
* Full theme.json integration
* Complete documentation and type hints
* WordPress coding standards compliance

== Upgrade Notice ==

= 0.1.0 =
Initial release of the Countdown Timer block.
