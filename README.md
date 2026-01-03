# GatherPress Countdown

**Contributors:** cb + WordPress Telex  
**Tags:** block, countdown, timer, gatherpress, event, theater, performance  
**Tested up to:** 6.8  
**Stable tag:** 0.1.0  
**Requires at least:** 6.4  
**Requires PHP:** 7.4  
**License:** GPLv2 or later  
**License URI:** https://www.gnu.org/licenses/gpl-2.0.html  

Countdown timer block with real-time updates, GatherPress event integration, and context-aware date synchronization.

https://github.com/user-attachments/assets/2d372d4f-950a-483b-a098-c91f69d10871

---

## Description

GatherPress Countdown displays time remaining until future events or elapsed time since past events. Built specifically for theater productions and GatherPress event management, it provides flexible date selection and automatic synchronization.

---

## Core Features

### Date Selection Methods

- Manual date/time picker with minute and second precision  
- Direct GatherPress event selection  
- Taxonomy-based next event selection  
- Automatic context inheritance from event posts  

### Time Display

- Real-time updates every second on frontend and editor  
- Seven time segments: years, months, weeks, days, hours, minutes, seconds  
- Configurable segment visibility with cascading calculations  
- Automatic hiding of zero-value segments on frontend  
- Plural/singular label switching based on values  

### Block Styles

- **Classic:** Traditional countdown with boxed segments  
- **Modern:** Large numbers with separator colons  
- **Minimal:** Clean typography with subtle labels  
- **Bold:** High-contrast design with background  

### Technical Implementation

- Singleton pattern for efficient resource management  
- Complete PHP type hints and DocBlocks  
- WordPress coding standards compliance  
- Full `theme.json` support for customization  
- Context-aware rendering in query loops and templates  
- Proper escaping and sanitization throughout  

---

## Installation

1. Upload plugin files to `/wp-content/plugins/gatherpress-countdown/`  
2. Activate through the WordPress Plugins screen  
3. Add the **Countdown Timer** block to posts, pages, or templates  
4. Configure using toolbar date selection options  
5. Customize appearance through block styles or `theme.json`  

---

## Usage Examples

<details>
<summary><strong>Example 1: Theater Opening Night</strong></summary>

**Scenario:** Display countdown to your theater's opening night performance.

1. Add the Countdown Timer block to your theater's homepage  
2. Click the calendar icon in the block toolbar  
3. Select opening night date and curtain time (e.g., December 15, 2025 at 19:30)  
4. Choose the **Bold** style for dramatic impact  
5. In Time Segments settings, enable: Days, Hours, Minutes  
6. Result: `05 Days 03 Hours 42 Minutes` updating in real time  

The countdown automatically switches to count-up mode after the curtain rises, showing time elapsed since opening.
</details>

<details>
<summary><strong>Example 2: Season Ticket Deadline</strong></summary>

**Scenario:** Countdown to season ticket purchase deadline.

1. Add block to your ticketing page  
2. Select deadline date (e.g., August 31, 2025 at 23:59)  
3. Choose **Modern** style for clean presentation  
4. Enable segments: Weeks, Days, Hours  
5. Cascading display shows `8 Weeks` initially  
6. As deadline approaches, automatically displays `3 Days 14 Hours`  

Segments cascade intelligently—if weeks reach zero, days expand to show full count.
</details>

<details>
<summary><strong>Example 3: GatherPress Event Integration</strong></summary>

**Scenario:** Countdown to specific theater production in GatherPress.

1. Create a GatherPress event for your production (“Hamlet – Evening Performance”)  
2. Add Countdown Timer block to the production landing page  
3. Click the event icon (🎟️) in the block toolbar  
4. Search and select “Hamlet – Evening Performance”  
5. Block automatically syncs with the event’s start datetime  
6. Update the event date in GatherPress — countdown updates automatically  

This maintains a single source of truth for event dates.
</details>

<details>
<summary><strong>Example 4: Venue-Based Next Performance</strong></summary>

**Scenario:** Display countdown to the next performance at a specific venue.

1. Ensure GatherPress events use the **Venues** taxonomy  
2. Tag productions with a venue (e.g., “Main Stage Theater”)  
3. Add Countdown Timer block to the venue page  
4. Click the taxonomy icon (🏷️) in the toolbar  
5. Select **Venues** taxonomy  
6. Select **Main Stage Theater** term  
7. Block displays countdown to the next chronological event at that venue  

The block updates automatically as performances conclude.
</details>

<details>
<summary><strong>Example 5: Topic-Based Series Countdown</strong></summary>

**Scenario:** Countdown to the next event in a themed series.

1. Create GatherPress **Topics** taxonomy terms (e.g., “Shakespeare Festival”)  
2. Tag related events with the topic  
3. Add Countdown Timer block to the festival series page  
4. Select taxonomy source from toolbar  
5. Choose **Topics** → **Shakespeare Festival**  
6. Block shows countdown to the next festival event  
7. Automatically advances through the series chronologically  

Ideal for multi-show festivals or themed seasons.
</details>

<details>
<summary><strong>Example 6: Context-Aware Event Templates</strong></summary>

**Scenario:** Add countdown to a GatherPress event post template.

1. Edit the GatherPress event post type template  
2. Add Countdown Timer block anywhere in the template  
3. Do not configure any date source  
4. Block automatically inherits event datetime from post context  
5. Each event displays its own countdown  

Provides consistent countdowns without manual configuration.
</details>

<details>
<summary><strong>Example 7: Query Loop Integration</strong></summary>

**Scenario:** Display countdowns for multiple upcoming productions.

1. Create a Query Loop block filtered to GatherPress events  
2. Inside the loop template, add Countdown Timer block  
3. Block inherits datetime from each event  
4. Result: list or grid with individual countdowns  
5. Each countdown updates independently in real time  

Perfect for “Upcoming Productions” sections.
</details>

<details>
<summary><strong>Example 8: Historical Performance Archive</strong></summary>

**Scenario:** Show time elapsed since a theater milestone.

1. Add Countdown Timer to your theater history page  
2. Select historic date (e.g., January 15, 1998)  
3. Block switches to count-up mode automatically  
4. Enable segments: Years, Months, Days  
5. Display shows `27 Years 11 Months 09 Days` since opening  
6. Updates continuously  

Count-up mode activates for any past date.
</details>

<details>
<summary><strong>Example 9: Multiple Show Format Variations</strong></summary>

**Scenario:** Different countdown styles for different production types.

- Matinee performances: **Minimal** style, Days / Hours / Minutes  
- Opening nights: **Bold** style, all segments enabled  
- Workshop events: **Classic** style, Hours and Minutes only  
- Season announcements: **Modern** style, Weeks and Days  

Styles and segments allow clear visual differentiation.
</details>

<details>
<summary><strong>Example 10: Intermission Timer</strong></summary>

**Scenario:** Display countdown during theater intermission.

1. Add block to the intermission display screen  
2. Set target time to intermission end (15 minutes from now)  
3. Enable only Minutes and Seconds  
4. Choose **Bold** style  
5. Display shows `14 Minutes 32 Seconds`  
6. Audience can easily track remaining time  

Short-duration countdowns work well with focused segments.
</details>

---

## Frequently Asked Questions

### How do I set a countdown date?

Three methods:

1. Calendar icon in toolbar for manual date/time  
2. Event icon to select a GatherPress event  
3. Taxonomy icon to use the next event from a term  

Blocks in event context inherit dates automatically.

### What happens when the countdown reaches zero?

The block switches automatically to count-up mode, displaying elapsed time since the target date.

### How does segment cascading work?

Time redistributes based on enabled segments.

- Target: 40 days away  
- With months enabled: `1 Month 10 Days`  
- Without months: `40 Days`  

### When do segments hide on the frontend?

Segments hide when they reach zero **and** all larger segments are already hidden.

Example:  
`00 Days 05 Hours 30 Minutes` → `05 Hours 30 Minutes`

### How does GatherPress event sync work?

The block reads event datetime from post meta. Any event date change updates all connected countdowns automatically.

### Can I customize the appearance?

Yes:

1. Four predefined styles  
2. `theme.json` color and typography support  
3. Block supports for spacing and alignment  
4. Custom CSS  

### Does it work in query loops?

Yes. Each event in the loop renders its own countdown from context.

### What about page caching?

Initial HTML is server-rendered; JavaScript recalculates time on load and updates every second.

### Can I use it without GatherPress?

Yes. Manual date selection works independently of GatherPress.

### How precise are the calculations?

Updates every second and accounts for:

- Variable month lengths (30.44-day average)  
- Leap years (365.25-day average)  
- Cascading based on visible segments  

---

## Screenshots

1. Block toolbar with date selection methods  
2. Manual datetime picker with seconds  
3. GatherPress event selector  
4. Taxonomy selector  
5. Inspector panel segment toggles  
6. Classic style countdown  
7. Modern style with colons  
8. Minimal style  
9. Bold style  
10. Context-aware event template display  
11. Multiple countdowns in query loop  
12. Count-up mode display  

---

## Changelog

### 0.1.0

- Initial release  
- Manual datetime picker with seconds  
- GatherPress event and taxonomy integration  
- Context-aware date inheritance  
- Seven cascading time segments  
- Automatic zero-segment hiding  
- Four block styles  
- Singular/plural labels  
- Real-time updates  
- Full documentation and type hints  
- WordPress coding standards compliance  
- Singleton architecture  
- Full `theme.json` integration  

---

## Upgrade Notice

### 0.1.0

Initial release of GatherPress Countdown block with comprehensive countdown/count-up functionality, GatherPress integration, and context-aware date synchronization.

