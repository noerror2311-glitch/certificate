/* =========================================================
   Certificate Maker — script.js
   ========================================================= */

/* ---------- Fonts (36) ----------
   t = type (script / serif / display / sans)
   k = size factor for the message so every font looks balanced */
const FONTS = [
  // handwriting & script
  { n: 'Great Vibes',        t: 'script',  k: 1.3 },
  { n: 'Dancing Script',     t: 'script',  k: 1.2 },
  { n: 'Caveat',             t: 'script',  k: 1.25 },
  { n: 'Pacifico',           t: 'script',  k: 1 },
  { n: 'Satisfy',            t: 'script',  k: 1.2 },
  { n: 'Sacramento',         t: 'script',  k: 1.3 },
  { n: 'Allura',             t: 'script',  k: 1.3 },
  { n: 'Alex Brush',         t: 'script',  k: 1.3 },
  { n: 'Parisienne',         t: 'script',  k: 1.25 },
  { n: 'Tangerine',          t: 'script',  k: 1.45 },
  { n: 'Pinyon Script',      t: 'script',  k: 1.2 },
  { n: 'Kaushan Script',     t: 'script',  k: 1.05 },
  { n: 'Yellowtail',         t: 'script',  k: 1.2 },
  { n: 'Courgette',          t: 'script',  k: 1.05 },
  { n: 'Cookie',             t: 'script',  k: 1.3 },
  { n: 'Italianno',          t: 'script',  k: 1.4 },
  { n: 'Rochester',          t: 'script',  k: 1.1 },
  { n: 'Shadows Into Light', t: 'script',  k: 1.2 },
  { n: 'Indie Flower',       t: 'script',  k: 1.1 },
  { n: 'Handlee',            t: 'script',  k: 1.05 },
  { n: 'Amatic SC',          t: 'script',  k: 1.45 },
  // serif
  { n: 'Playfair Display',   t: 'serif',   k: 1 },
  { n: 'Cinzel',             t: 'serif',   k: .95 },
  { n: 'Cormorant Garamond', t: 'serif',   k: 1.15 },
  { n: 'Lora',               t: 'serif',   k: 1 },
  { n: 'Merriweather',       t: 'serif',   k: .9 },
  { n: 'Philosopher',        t: 'serif',   k: 1 },
  // display
  { n: 'Abril Fatface',      t: 'display', k: .9 },
  { n: 'Berkshire Swash',    t: 'display', k: .95 },
  { n: 'Oleo Script',        t: 'display', k: 1 },
  { n: 'Lobster',            t: 'display', k: 1.05 },
  { n: 'Righteous',          t: 'display', k: .9 },
  // clean sans
  { n: 'Fredoka',            t: 'sans',    k: .95 },
  { n: 'Comfortaa',          t: 'sans',    k: .9 },
  { n: 'Poppins',            t: 'sans',    k: .92 },
  { n: 'Montserrat',         t: 'sans',    k: .92 }
];

const FONT_GROUPS = {
  script: 'Handwriting & script',
  serif: 'Classic serif',
  display: 'Fancy display',
  sans: 'Clean & modern'
};

const fontOf = name => FONTS.find(f => f.n === name) || FONTS[0];
const fontCss = f => `'${f.n}', ${f.t === 'serif' ? 'serif' : f.t === 'sans' ? 'sans-serif' : 'cursive'}`;

/* fonts that stay easy to read as a paragraph (used by "Shuffle style") */
const READABLE = FONTS.filter(f =>
  f.t === 'serif' || f.t === 'sans' || ['Caveat', 'Handlee', 'Indie Flower'].includes(f.n)
);
const SIGNATURES = FONTS.filter(f => f.t === 'script' && f.n !== 'Amatic SC');

/* ---------- Certificate templates ---------- */
const TEMPLATES = {
  love: {
    label: '❤️ Love',
    title: 'Certificate of Love',
    sub: 'This certificate of forever is lovingly presented to',
    name: 'My Favourite Person',
    msg: 'For being the person who makes my worst days feel okay with just one message, who remembers the tiny things I forget I ever said, and who turned an ordinary "hi" into my favourite story. For being my home, my calm and my forever. This heart officially belongs to you.',
    seal: '❤️', deco: '♥ ♥ ♥',
    theme: 'rose', border: 'hearts', pattern: 'hearts',
    titleFont: 'Cinzel', nameFont: 'Great Vibes', msgFont: 'Playfair Display', sigFont: 'Dancing Script'
  },
  bestfriend: {
    label: '👯 Best Friend',
    title: 'Best Friend Certificate',
    sub: 'The official title of Best Friend for Life goes to',
    name: 'My Bestie',
    msg: 'For being the one who answers my 2 AM calls, laughs at my jokes before I even finish them, keeps every secret locked away, and tells me the truth when I do not want to hear it. For showing up with snacks and zero judgement every single time. Thank you for being my person.',
    seal: '👯', deco: '★ ★ ★',
    theme: 'lavender', border: 'triple', pattern: 'stars',
    titleFont: 'Playfair Display', nameFont: 'Dancing Script', msgFont: 'Lora', sigFont: 'Satisfy'
  },
  couple: {
    label: '💑 Couple Goals',
    title: 'Couple Goals Award',
    sub: 'Proudly awarded to the cutest couple in the world',
    name: 'You & Me',
    msg: 'For being the couple who laughs in the middle of an argument, shares the last bite of every meal, plans a thousand trips and still just wants to stay home together. For choosing each other every single day, on the easy days and on the messy ones too.',
    seal: '💑', deco: '✦ ✦ ✦',
    theme: 'sunset', border: 'ribbon', pattern: 'confetti',
    titleFont: 'Cinzel', nameFont: 'Parisienne', msgFont: 'Cormorant Garamond', sigFont: 'Allura'
  },
  birthday: {
    label: '🎂 Birthday',
    title: 'Birthday Certificate',
    sub: 'Happy Birthday to the one and only',
    name: 'Birthday Star',
    msg: 'For being a whole year wiser, funnier and more wonderful, and for still being the person who lights up every room just by walking in. May this year bring endless cake, surprise plans that actually work out, and every wish you secretly made. You deserve the whole world today!',
    seal: '🎂', deco: '✦ ✦ ✦',
    theme: 'gold', border: 'balloons', pattern: 'confetti',
    titleFont: 'Abril Fatface', nameFont: 'Pacifico', msgFont: 'Lora', sigFont: 'Yellowtail'
  },
  kindness: {
    label: '🌼 Kindness',
    title: 'Kindest Heart Award',
    sub: 'With deep gratitude, this award is given to',
    name: 'Kind Soul',
    msg: 'For being the person who listens without interrupting, helps without being asked, and remembers to check in when everyone else forgets. For your gentle words, your warm heart and the quiet way you make the world a little softer for everyone around you.',
    seal: '🌼', deco: '✿ ✿ ✿',
    theme: 'mint', border: 'leaves', pattern: 'flowers',
    titleFont: 'Cormorant Garamond', nameFont: 'Sacramento', msgFont: 'Lora', sigFont: 'Dancing Script'
  },
  cutie: {
    label: '😘 Cutest Person',
    title: 'Cutest Person Award',
    sub: 'After very careful judging, the winner is',
    name: 'Cutie Pie',
    msg: 'Awarded for being the owner of the sweetest smile, for laughing at your own jokes before the punchline, for stealing every hoodie and every heart, and for reaching the highest level of cuteness ever recorded. No recounts, no appeals, no refunds!',
    seal: '😘', deco: '♥ ♥ ♥',
    theme: 'bubblegum', border: 'rounded', pattern: 'dots',
    titleFont: 'Fredoka', nameFont: 'Caveat', msgFont: 'Comfortaa', sigFont: 'Cookie'
  },
  sorry: {
    label: '🥺 Sorry',
    title: 'Sorry Certificate',
    sub: 'A heartfelt apology is hereby given to',
    name: 'My Dear One',
    msg: 'For all the times I was careless with your feelings, too stubborn to say sorry, or too busy to notice you were hurting. I am truly sorry. You mean more to me than any argument ever could, and I promise to listen better and love louder. Can we please start over?',
    seal: '🥺', deco: '✦ ✦ ✦',
    theme: 'blush', border: 'inner-line', pattern: 'waves',
    titleFont: 'Cinzel', nameFont: 'Great Vibes', msgFont: 'Cormorant Garamond', sigFont: 'Alex Brush'
  },
  thanks: {
    label: '🏆 Appreciation',
    title: 'Certificate of Appreciation',
    sub: 'This certificate is proudly presented to',
    name: 'Amazing Person',
    msg: 'For being the one who always goes the extra mile, stays back to help when no one is watching, and makes hard things look easy. Thank you for your effort, your patience and your support. Your hard work has made a real difference and never goes unnoticed.',
    seal: '🏆', deco: '★ ★ ★',
    theme: 'royal', border: 'double', pattern: 'diamonds',
    titleFont: 'Cinzel', nameFont: 'Pinyon Script', msgFont: 'Lora', sigFont: 'Alex Brush'
  }
};

/* ---------- Categories & more certificate types ---------- */
const CATS = {
  love:   '💕 Love & Romance',
  family: '🤝 Friends & Family',
  celeb:  '🎉 Celebrations & Festivals',
  fun:    '😄 Fun Awards',
  thanks: '🌼 Kindness & Thanks',
  sorry:  '🥺 Sorry & Support',
  school: '🎓 School & Work'
};

// the first eight templates (written above) belong to these categories
Object.entries({
  love: 'love', couple: 'love', bestfriend: 'family', birthday: 'celeb',
  kindness: 'thanks', thanks: 'thanks', cutie: 'fun', sorry: 'sorry'
}).forEach(([k, c]) => { TEMPLATES[k].cat = c; });

/* add(category, key, button label, title, line above name, default name, message,
       seal, deco, theme, border, pattern, titleFont, nameFont, msgFont, sigFont) */
function add(cat, key, label, title, sub, name, msg, seal, deco, theme, border, pattern, titleFont, nameFont, msgFont, sigFont) {
  TEMPLATES[key] = { cat, label, title, sub, name, msg, seal, deco, theme, border, pattern, titleFont, nameFont, msgFont, sigFont };
}

/* ----- Love & Romance ----- */
add('love', 'anniversary', '💞 Anniversary', 'Happy Anniversary',
  'Celebrating another beautiful year of love for', 'Us, Always',
  'For being the person I would choose again in every lifetime, who held my hand through the busy days and the quiet ones, and who made every year feel shorter than it was. Here is to more road trips, more inside jokes and many more years of us.',
  '💞', '♥ ♥ ♥', 'wine', 'double', 'hearts', 'Cinzel', 'Great Vibes', 'Cormorant Garamond', 'Alex Brush');
add('love', 'valentine', '💌 Valentine', 'Be My Valentine',
  'This special Valentine certificate is sent to', 'My Valentine',
  'For being the reason I check my phone with a smile, the first person I want to tell good news, and the last person I want to say goodnight to. For making every ordinary day feel like the 14th of February. Will you be mine, today and every day?',
  '💌', '♥ ♥ ♥', 'cherry', 'hearts', 'hearts', 'Playfair Display', 'Parisienne', 'Lora', 'Allura');
add('love', 'girlfriend', '👸 Girlfriend', 'Best Girlfriend Award',
  'The title of Best Girlfriend in the Universe goes to', 'My Girlfriend',
  'For being the girl who steals my fries and my hoodies, tells me the truth gently, cheers for me louder than anyone, and turns ordinary plans into adventures. For loving me on my best days and on my grumpy ones too.',
  '👸', '♥ ♥ ♥', 'bubblegum', 'butterfly', 'flowers', 'Playfair Display', 'Sacramento', 'Lora', 'Cookie');
add('love', 'boyfriend', '🧸 Boyfriend', 'Best Boyfriend Award',
  'The title of Best Boyfriend Ever goes to', 'My Boyfriend',
  'For being the guy who remembers my favourite order, waits patiently while I take forever to get ready, makes me laugh on my worst days and always makes me feel safe. For being my best friend with the best hugs.',
  '🧸', '★ ★ ★', 'ocean', 'brackets', 'grid', 'Cinzel', 'Dancing Script', 'Lora', 'Satisfy');
add('love', 'husband', '🤵 Husband', 'World\'s Best Husband',
  'With all my love, this award is presented to', 'My Husband',
  'For being the husband who works hard, shows up, listens when I vent, and still makes me laugh after all this time. For turning a house into a home and for being my partner in every plan, big or small.',
  '🤵', '✦ ✦ ✦', 'charcoal', 'double', 'diamonds', 'Cinzel', 'Pinyon Script', 'Cormorant Garamond', 'Alex Brush');
add('love', 'wife', '👰 Wife', 'World\'s Best Wife',
  'With endless love and thanks, this award is presented to', 'My Wife',
  'For being the wife who holds the family together, believes in my dreams, and makes our home feel warm no matter what the day brought. For your patience, your strength and your smile. I am the luckiest person in the world to have you.',
  '👰', '♥ ♥ ♥', 'rosegold', 'roses', 'flowers', 'Playfair Display', 'Great Vibes', 'Lora', 'Allura');
add('love', 'crush', '🥰 Crush', 'Official Crush Certificate',
  'It is officially confirmed that I have a crush on', 'My Crush',
  'For being the person who makes my heart skip when you walk in, who has no idea how often I think of you, and whose smile has ruined my ability to act normal. This certificate is proof. Please handle with care.',
  '🥰', '♥ ♥ ♥', 'peach', 'dotted', 'dots', 'Fredoka', 'Caveat', 'Comfortaa', 'Cookie');
add('love', 'soulmate', '✨ Soulmate', 'Soulmate Certificate',
  'It is written in the stars that you are the soulmate of', 'My Soulmate',
  'For being the person who feels like home the moment we talk, who understands what I mean even when I cannot find the words, and who feels like the answer to every wish I ever made. Some people simply find each other, and we did.',
  '✨', '✦ ✦ ✦', 'midnight', 'sparkle', 'stars', 'Cinzel', 'Pinyon Script', 'Cormorant Garamond', 'Alex Brush');
add('love', 'hugger', '🤗 Best Hugger', 'Hug Champion Award',
  'The warmest hugs in the world are officially owned by', 'Hug Champion',
  'For being the person whose hugs fix bad days, cure the Monday blues and make the whole world go quiet for a moment. For giving the tightest, warmest hugs ever recorded. This certificate entitles you to unlimited hugs in return.',
  '🤗', '♥ ♥ ♥', 'coral', 'rounded', 'hearts', 'Fredoka', 'Pacifico', 'Comfortaa', 'Yellowtail');
add('love', 'missyou', '🥹 Miss You', 'Missing You Certificate',
  'A very big long-distance hug is sent to', 'Someone I Miss',
  'For being the person I miss at the strangest moments, when something funny happens, when our favourite song plays, when the day feels too quiet. Distance cannot change how close you are to me. See you soon, and until then, here is a big hug.',
  '🥹', '♥ ♥ ♥', 'sky', 'dashed', 'waves', 'Playfair Display', 'Dancing Script', 'Lora', 'Satisfy');

/* ----- Friends & Family ----- */
add('family', 'sister', '👭 Sister', 'Best Sister Award',
  'The title of Greatest Sister in the World goes to', 'My Sister',
  'For being the sister who knows all my secrets and still keeps them, who fights with me and defends me in the same breath, and who is my first friend and my forever partner in crime. Thank you for always being on my side.',
  '👭', '✿ ✿ ✿', 'lilac', 'floral', 'flowers', 'Playfair Display', 'Dancing Script', 'Lora', 'Satisfy');
add('family', 'brother', '👬 Brother', 'Best Brother Award',
  'The title of Coolest Brother Ever goes to', 'My Brother',
  'For being the brother who teased me, protected me, shared his snacks (sometimes), and showed up the moment I needed him. For being my first hero and my lifelong friend. I may not say it often, but I am proud to be your sibling.',
  '👬', '★ ★ ★', 'sky', 'thick', 'stripes', 'Cinzel', 'Oleo Script', 'Merriweather', 'Kaushan Script');
add('family', 'mom', '💐 Mom', 'World\'s Best Mom',
  'With all my love, this award is given to', 'My Mom',
  'For being the mom who stayed up when I was sick, packed my tiffin with love, forgave my mistakes and believed in me more than I believed in myself. For every sacrifice I only understood later. Everything good in me started with you.',
  '💐', '✿ ✿ ✿', 'rose', 'floral', 'flowers', 'Playfair Display', 'Great Vibes', 'Lora', 'Alex Brush');
add('family', 'dad', '🦸 Dad', 'World\'s Best Dad',
  'With love and respect, this award is given to', 'My Dad',
  'For being the dad who worked quietly so I could dream loudly, who taught me to stand up after falling, and who never says much but always shows up. You are my first hero and my strongest support. Thank you for everything.',
  '🦸', '★ ★ ★', 'coffee', 'thick', 'diamonds', 'Cinzel', 'Pinyon Script', 'Merriweather', 'Yellowtail');
add('family', 'grandma', '👵 Grandma', 'Best Grandma Award',
  'With all my love and heart, this award is given to', 'Dear Grandma',
  'For being the grandma whose lap felt like the safest place, whose stories I could listen to forever, and whose blessings follow me everywhere. For the extra sweets, the gentle advice and the endless love. You keep our family\'s heart warm.',
  '👵', '✿ ✿ ✿', 'peach', 'floral', 'flowers', 'Playfair Display', 'Sacramento', 'Lora', 'Allura');
add('family', 'grandpa', '👴 Grandpa', 'Best Grandpa Award',
  'With love and respect, this award is given to', 'Dear Grandpa',
  'For being the grandpa who tells the best stories, teaches life lessons without ever lecturing, and always sneaks me a treat when no one is looking. Your wisdom and your love are treasures I carry with me every single day.',
  '👴', '★ ★ ★', 'coffee', 'classic', 'grid', 'Cinzel', 'Pinyon Script', 'Merriweather', 'Parisienne');
add('family', 'cousin', '🫶 Cousin', 'Best Cousin Award',
  'The official title of Cousin and Partner in Crime goes to', 'My Cousin',
  'For being the cousin who is more like a sibling, who shares every family secret, lights up every wedding and holiday, and always makes the best memories. Here is to many more road trips, late-night talks and silly dance moves together.',
  '🫶', '✦ ✦ ✦', 'aqua', 'stars', 'confetti', 'Fredoka', 'Caveat', 'Comfortaa', 'Cookie');
add('family', 'family', '🏡 Family', 'Best Family Award',
  'The warmest family in the world is proudly presented to', 'My Family',
  'For being the family who laughs at the same old jokes, sits together for dinner, cheers for each other\'s wins and holds each other through the hard days. You are my home, my strength and my biggest blessing.',
  '🏡', '♥ ♥ ♥', 'gold', 'triple', 'hearts', 'Playfair Display', 'Dancing Script', 'Lora', 'Satisfy');

/* ----- Celebrations & Festivals ----- */
add('celeb', 'wedding', '💍 Wedding', 'Wedding Certificate',
  'Heartfelt congratulations on the wedding of', 'The Happy Couple',
  'For choosing love, for promising forever, and for starting a new chapter together. May your home be full of laughter, your hearts full of patience and your years full of happiness. Wishing you a lifetime of love and togetherness.',
  '💍', '♥ ♥ ♥', 'gold', 'double', 'flowers', 'Cinzel', 'Great Vibes', 'Cormorant Garamond', 'Alex Brush');
add('celeb', 'congrats', '🎉 Congratulations', 'Congratulations Certificate',
  'Heartiest congratulations are presented to', 'Superstar',
  'For working so hard, staying so patient and never giving up, even when it got difficult. This success belongs to you completely. We are so proud of everything you have achieved and cannot wait to see what you do next!',
  '🎉', '★ ★ ★', 'gold', 'sparkle', 'confetti', 'Abril Fatface', 'Pacifico', 'Lora', 'Yellowtail');
add('celeb', 'newyear', '🎆 New Year', 'Happy New Year',
  'May the new year bring joy, luck and love to', 'My Dear One',
  'For being a part of my year, my best memories and my favourite people. May the coming year bring you more laughter, fewer worries, bigger dreams and every wish coming true. Thank you for being part of my story. Happy New Year!',
  '🎆', '✦ ✦ ✦', 'midnight', 'stars', 'stars', 'Righteous', 'Great Vibes', 'Lora', 'Allura');
add('celeb', 'diwali', '🪔 Diwali', 'Happy Diwali',
  'Wishing a bright and joyful Diwali to', 'Dear One',
  'For being the light in my life, the sweetness in my celebrations and the warmth in my home. May this Diwali fill your life with diyas, rangoli, laughter and love, and may happiness and prosperity light up your path all year long.',
  '🪔', '✦ ✦ ✦', 'sunset', 'sparkle', 'plus', 'Berkshire Swash', 'Great Vibes', 'Lora', 'Alex Brush');
add('celeb', 'raksha', '🎀 Raksha Bandhan', 'Happy Raksha Bandhan',
  'With love, a sacred thread of protection is tied for', 'My Dear Brother',
  'For being the brother who protects me, teases me, and loves me in his own special way. This rakhi is a promise of our bond, of fights that end in laughter and of memories that last forever. Thank you for always having my back.',
  '🎀', '✿ ✿ ✿', 'coral', 'ribbon', 'flowers', 'Playfair Display', 'Dancing Script', 'Lora', 'Satisfy');
add('celeb', 'friendshipday', '🤝 Friendship Day', 'Happy Friendship Day',
  'A day of friendship is celebrated with', 'My Dearest Friend',
  'For being the friend who is there in the good times, the bad times and the very awkward times. Thank you for the laughs, the support and for turning ordinary days into memories. Friends like you are rare, and I am lucky to have you.',
  '🤝', '★ ★ ★', 'aqua', 'sparkle', 'plus', 'Fredoka', 'Dancing Script', 'Comfortaa', 'Cookie');
add('celeb', 'christmas', '🎄 Christmas', 'Merry Christmas',
  'Warm Christmas wishes are sent to', 'Dear Friend',
  'For being a gift in my life all year round. May your Christmas be filled with warm hugs, twinkling lights, good food and the people you love most. Wishing you peace, joy and a very Merry Christmas!',
  '🎄', '✦ ✦ ✦', 'forest', 'stars', 'stars', 'Berkshire Swash', 'Great Vibes', 'Lora', 'Alex Brush');
add('celeb', 'eid', '🌙 Eid', 'Eid Mubarak',
  'Warmest Eid wishes are sent to', 'Dear One',
  'For being a blessing in my life. May this Eid bring you joy, peace and success, may your prayers be answered and your table be full of sweetness, and may your heart always be full of happiness. Eid Mubarak to you and your family!',
  '🌙', '✦ ✦ ✦', 'emerald', 'sparkle', 'stars', 'Cinzel', 'Sacramento', 'Lora', 'Allura');
add('celeb', 'holi', '🎨 Holi', 'Happy Holi',
  'Wishing a colourful and joyful Holi to', 'My Colourful Friend',
  'For colouring my life brighter than any gulal ever could. May this Holi bring you happiness, sweets, laughter and all the colours of joy. Let us forget the worries, play with colours and celebrate together. Happy Holi!',
  '🎨', '✿ ✿ ✿', 'bubblegum', 'balloons', 'confetti', 'Abril Fatface', 'Pacifico', 'Comfortaa', 'Cookie');
add('celeb', 'baby', '👶 New Baby', 'Welcome Little One',
  'Congratulations on the arrival of', 'Little Angel',
  'For arriving in this world and making it a softer, brighter place. Your tiny fingers have already stolen our hearts, and we cannot wait to watch you grow, laugh and learn. Welcome to the family, little one. You are so loved.',
  '👶', '✿ ✿ ✿', 'blush', 'balloons', 'dots', 'Fredoka', 'Sacramento', 'Comfortaa', 'Cookie');

/* ----- Fun Awards ----- */
add('fun', 'funniest', '😂 Funniest Person', 'Funniest Person Award',
  'The crown of Comedy goes to', 'Laughing Legend',
  'For being the person who can turn any boring day into a comedy show, who makes me laugh at the worst possible times and whose jokes are so bad that they become good. Thank you for being my daily dose of laughter.',
  '😂', '★ ★ ★', 'lemon', 'rounded', 'dots', 'Righteous', 'Pacifico', 'Comfortaa', 'Yellowtail');
add('fun', 'foodie', '🍕 Foodie', 'Official Foodie Award',
  'The title of Food Lover Number One goes to', 'Master Foodie',
  'For being the person who knows every good restaurant, finishes everyone\'s leftovers, and gets emotional about a perfect biryani. For never letting a meal be boring and always sharing the last bite (sometimes). A true champion of food.',
  '🍕', '✦ ✦ ✦', 'coral', 'dashed', 'dots', 'Lobster', 'Pacifico', 'Comfortaa', 'Cookie');
add('fun', 'sleepyhead', '😴 Sleepyhead', 'Sleepyhead Champion',
  'The Gold Medal in Sleeping goes to', 'Sleepy Head',
  'For being the person who can sleep anywhere, anytime, through any alarm, in any position. For hitting snooze ten times and still waking up cranky and adorable. You are the undefeated world champion of naps.',
  '😴', '✦ ✦ ✦', 'lilac', 'rounded', 'stars', 'Fredoka', 'Sacramento', 'Comfortaa', 'Cookie');
add('fun', 'overthinker', '🧠 Overthinker', 'Overthinker of the Year',
  'After 3,000 thoughts at 2 AM, the title goes to', 'Professional Overthinker',
  'For being the person who replays every conversation ten times, has a backup plan for the backup plan, and finds a hidden meaning in one "ok". Your mind never rests, but your heart is always in the right place. You are doing better than you think.',
  '🧠', '✦ ✦ ✦', 'silver', 'dotted-inner', 'grid', 'Righteous', 'Caveat', 'Handlee', 'Shadows Into Light');
add('fun', 'gamer', '🎮 Gamer', 'Gamer of the Year',
  'The Final Boss has been defeated by', 'Pro Gamer',
  'For being the player who never rage quits (almost), who carries the whole team, who stays up for just one more match, and who has the fastest reflexes of anyone I know. Respect, legend. GG, and may your Wi-Fi never lag.',
  '🎮', '★ ★ ★', 'midnight', 'thick', 'grid', 'Righteous', 'Righteous', 'Comfortaa', 'Yellowtail');
add('fun', 'bestcook', '🍳 Best Cook', 'Best Cook Award',
  'The Golden Spatula is awarded to', 'Master Chef',
  'For being the cook whose kitchen smells like love, who turns simple ingredients into something magical, and who makes everyone ask for a second helping. Every meal made by you tastes like home. Please keep cooking forever.',
  '🍳', '✦ ✦ ✦', 'peach', 'ribbon', 'flowers', 'Playfair Display', 'Parisienne', 'Lora', 'Allura');
add('fun', 'selfie', '🤳 Selfie Star', 'Selfie Star Award',
  'The best angles, filters and poses belong to', 'Selfie Star',
  'For being the person who finds the perfect light in any room, takes forty photos to pick the best one, and still makes every picture look amazing. Thank you for preserving our memories with the cutest poses ever.',
  '🤳', '✦ ✦ ✦', 'bubblegum', 'sparkle', 'plus', 'Pacifico', 'Sacramento', 'Comfortaa', 'Cookie');
add('fun', 'latenight', '🌙 Late Night Talker', 'Late Night Talker Award',
  'The title of Midnight Conversation Champion goes to', 'Night Owl',
  'For being the person who is awake at 2 AM when I cannot sleep, who stays on the call until the sun rises, and with whom the conversation never ends. Our best talks happen when the whole world is asleep, and I am grateful for every one.',
  '🦉', '✦ ✦ ✦', 'midnight', 'stars', 'stars', 'Cinzel', 'Great Vibes', 'Cormorant Garamond', 'Alex Brush');

/* ----- Kindness & Thanks ----- */
add('thanks', 'thankyou', '🙏 Thank You', 'Thank You Certificate',
  'With heartfelt thanks, this certificate is given to', 'Dear Friend',
  'For being there when I needed help without being asked, for the favours you never mentioned and the support you never counted. Words feel too small for what you have done, so please accept this certificate and my heartfelt thanks.',
  '🙏', '✿ ✿ ✿', 'rosegold', 'floral', 'flowers', 'Playfair Display', 'Great Vibes', 'Lora', 'Allura');
add('thanks', 'listener', '👂 Best Listener', 'Best Listener Award',
  'For always being there to listen, this award goes to', 'Best Listener',
  'For being the person who listens without judging, remembers what I said last week and asks "how are you, really?". For giving advice only when I ask and a shoulder whenever I need one. Talking to you always makes things lighter.',
  '👂', '✿ ✿ ✿', 'sage', 'inner-line', 'waves', 'Cormorant Garamond', 'Dancing Script', 'Lora', 'Satisfy');
add('thanks', 'helper', '🤲 Helping Hand', 'Helping Hand Award',
  'For always lending a hand, this award is given to', 'Helping Hand',
  'For being the person who shows up when someone is stuck, who carries the heavy bags, solves the problems no one else wants to touch, and never expects anything back. The world needs more people like you. Thank you for making life easier for everyone.',
  '🤲', '✿ ✿ ✿', 'mint', 'leaves', 'plus', 'Cormorant Garamond', 'Sacramento', 'Lora', 'Dancing Script');
add('thanks', 'sunshine', '☀️ Sunshine', 'Sunshine Award',
  'For spreading light and positivity, this is awarded to', 'My Sunshine',
  'For being the person who walks into a room and makes everyone smile, who finds something good in every situation and whose energy is contagious. On cloudy days, you are the sunshine in everyone\'s life. Never stop shining.',
  '☀️', '✦ ✦ ✦', 'lemon', 'sparkle', 'dots', 'Playfair Display', 'Pacifico', 'Lora', 'Yellowtail');
add('thanks', 'hero', '🦸 My Hero', 'My Hero Award',
  'In honour of a real-life hero, this award is given to', 'My Hero',
  'For being the person who saved the day without a cape, who stood by me in my hardest time, and who inspires me to be braver and kinder. You may not realise how much you have done for me, but you are a real-life hero to me.',
  '🦸', '★ ★ ★', 'charcoal', 'brackets', 'stars', 'Cinzel', 'Pinyon Script', 'Merriweather', 'Alex Brush');

/* ----- Sorry & Support ----- */
add('sorry', 'forgiven', '🤍 Forgiven', 'Apology Accepted Certificate',
  'With a big heart, forgiveness is officially granted to', 'My Dear One',
  'For being sorry, for trying to make things right, and for being someone I could never stay upset with for long. I forgive you completely. Let us leave the fight behind us, share a hug and go back to being us. All is forgotten.',
  '🤍', '✦ ✦ ✦', 'cotton', 'inner-line', 'hearts', 'Cinzel', 'Great Vibes', 'Cormorant Garamond', 'Alex Brush');
add('sorry', 'getwell', '🌷 Get Well Soon', 'Get Well Soon',
  'Sending healing wishes and warm hugs to', 'Dear Friend',
  'For being someone I care about so much that a day without your smile feels empty. Rest well, drink your water, take your medicines and let everyone pamper you. Get well soon, because the world is not the same without you.',
  '🌷', '✿ ✿ ✿', 'mint', 'floral', 'flowers', 'Playfair Display', 'Dancing Script', 'Lora', 'Satisfy');
add('sorry', 'strong', '💪 You Are Strong', 'You Are Strong Certificate',
  'In recognition of courage in tough times, presented to', 'Brave Heart',
  'For being the person who kept going when it was hard, who smiled through the storm, and who got back up every single time life knocked you down. You are stronger than you know. I am proud of you, and I am here for you always.',
  '💪', '★ ★ ★', 'peach', 'brackets', 'plus', 'Cinzel', 'Great Vibes', 'Cormorant Garamond', 'Alex Brush');
add('sorry', 'goodluck', '🍀 All The Best', 'All The Best Certificate',
  'With full faith in your success, this is sent to', 'Future Topper',
  'For working hard, staying focused and never giving up. I believe in you completely. Whatever the exam, interview or challenge in front of you, go in with confidence, because you have already done the hard part. All the best, you have got this!',
  '🍀', '★ ★ ★', 'mint', 'shadow', 'stars', 'Righteous', 'Dancing Script', 'Comfortaa', 'Satisfy');

/* ----- School & Work ----- */
add('school', 'teacher', '🍎 Teacher', 'Best Teacher Award',
  'With respect and gratitude, this award is presented to', 'My Teacher',
  'For being the teacher who explained things patiently ten times, believed in me when I doubted myself, and made learning feel like an adventure. Thank you for shaping not just my marks but who I am becoming. I will always remember you.',
  '🍎', '✦ ✦ ✦', 'sage', 'inner-line', 'grid', 'Cinzel', 'Great Vibes', 'Lora', 'Alex Brush');
add('school', 'mentor', '🧭 Mentor', 'Mentor of the Year',
  'With deep gratitude, this award is presented to', 'My Mentor',
  'For being the mentor who gave honest advice, pushed me to do better, shared hard-earned lessons freely and believed in my potential long before I did. Thank you for guiding my path and showing me what is possible.',
  '🧭', '★ ★ ★', 'royal', 'double', 'diamonds', 'Cinzel', 'Pinyon Script', 'Lora', 'Alex Brush');
add('school', 'graduation', '🎓 Graduation', 'Graduation Certificate',
  'Heartfelt congratulations on your graduation to', 'The Graduate',
  'For all the late-night study sessions, the exams that felt impossible, the deadlines you beat and the dreams you never gave up on. You made it! The world is waiting for everything you will become. We are so proud of you.',
  '🎓', '★ ★ ★', 'royal', 'brackets', 'stars', 'Cinzel', 'Pinyon Script', 'Lora', 'Alex Brush');
add('school', 'topper', '🥇 Class Topper', 'Topper of the Class',
  'For outstanding academic excellence, this is awarded to', 'Class Topper',
  'For being the student who works hard, helps others understand, and always stays curious. Your dedication, discipline and love for learning inspire everyone around you. Keep shining and keep reaching higher. We are very proud of you.',
  '🥇', '★ ★ ★', 'gold', 'double', 'diamonds', 'Cinzel', 'Pinyon Script', 'Merriweather', 'Alex Brush');
add('school', 'employee', '⭐ Employee of the Month', 'Employee of the Month',
  'In recognition of outstanding performance, awarded to', 'Star Employee',
  'For consistently going the extra mile, meeting every deadline with a smile, helping teammates without being asked and bringing positivity to the office every single day. Your hard work and attitude set an example for everyone.',
  '⭐', '★ ★ ★', 'ocean', 'inner-line', 'grid', 'Cinzel', 'Pinyon Script', 'Lora', 'Yellowtail');
add('school', 'teamplayer', '🤝 Team Player', 'Best Team Player',
  'For teamwork and a great attitude, this award goes to', 'Team Player',
  'For being the teammate who lifts others up, shares the credit, takes on tasks without complaining and keeps everyone\'s spirits high during the toughest deadlines. A team is only as good as its people, and you make ours great.',
  '🤝', '★ ★ ★', 'sky', 'thick', 'dots', 'Montserrat', 'Satisfy', 'Poppins', 'Yellowtail');
add('school', 'retirement', '🌴 Retirement', 'Happy Retirement',
  'With respect and best wishes for the next chapter, to', 'Our Dear Colleague',
  'For decades of hard work, loyalty and dedication, for the lessons you taught everyone around you and the example you set every day. You have earned every moment of rest. Enjoy the mornings, the travels and the hobbies you have been waiting for.',
  '🌴', '✦ ✦ ✦', 'ocean', 'classic', 'waves', 'Cinzel', 'Pinyon Script', 'Lora', 'Yellowtail');

/* ---------- Colour themes (27) ----------
   panel = optional tint behind the text (darker for the dark themes) */
const THEMES = {
  rose:      { bg1: '#fff0f4', bg2: '#ffd1e0', accent: '#d6336c', text: '#5a2a3c' },
  gold:      { bg1: '#fffaf0', bg2: '#f7e6bd', accent: '#b8860b', text: '#4a3a1a' },
  lavender:  { bg1: '#f6f0ff', bg2: '#ddd0f7', accent: '#7048c8', text: '#3b2a63' },
  ocean:     { bg1: '#eefaff', bg2: '#c5e8f7', accent: '#1c7ed6', text: '#143a5a' },
  mint:      { bg1: '#f0fff6', bg2: '#c9f0d8', accent: '#2f9e5b', text: '#1d4a30' },
  sunset:    { bg1: '#fff4ec', bg2: '#ffd2b8', accent: '#e8590c', text: '#5a2f1a' },
  peach:     { bg1: '#fff6ee', bg2: '#ffd8c2', accent: '#e8785a', text: '#5c3328' },
  cherry:    { bg1: '#fff0f0', bg2: '#ffc9c9', accent: '#c92a2a', text: '#5c1f1f' },
  blush:     { bg1: '#fff7f7', bg2: '#f9dcdc', accent: '#c2788a', text: '#5a3a43' },
  bubblegum: { bg1: '#fff0fa', bg2: '#ffc6ea', accent: '#e0309e', text: '#5c2a4c' },
  lilac:     { bg1: '#faf5ff', bg2: '#e6d6fb', accent: '#9c5fd8', text: '#43285f' },
  plum:      { bg1: '#f8eef6', bg2: '#e3c3dd', accent: '#8e2a7e', text: '#4a1d44' },
  sky:       { bg1: '#f0f8ff', bg2: '#cfe6fb', accent: '#3b82c4', text: '#1b3a5c' },
  aqua:      { bg1: '#effffd', bg2: '#bdf0ea', accent: '#0ca5a0', text: '#11413f' },
  sage:      { bg1: '#f5f8f1', bg2: '#dbe6d0', accent: '#6b8f5a', text: '#2f4328' },
  forest:    { bg1: '#eef6ec', bg2: '#c6dec2', accent: '#2d6a3e', text: '#1c3b25' },
  lemon:     { bg1: '#fffdea', bg2: '#fff3a8', accent: '#d49a00', text: '#5a4a10' },
  coral:     { bg1: '#fff3f0', bg2: '#ffcfc4', accent: '#ee5d4f', text: '#5c2a24' },
  coffee:    { bg1: '#faf3ea', bg2: '#e6d3bb', accent: '#8a5a34', text: '#4a2f1b' },
  rosegold:  { bg1: '#fff4f1', bg2: '#f6d3ca', accent: '#b76e79', text: '#5a3338' },
  silver:    { bg1: '#f6f7f9', bg2: '#d7dbe2', accent: '#6c7589', text: '#2b3040' },
  cotton:    { bg1: '#f6fbff', bg2: '#f7d9f4', accent: '#7c6ff0', text: '#302a63' },
  // dark themes
  royal:     { bg1: '#243a73', bg2: '#101b3d', accent: '#f0c24b', text: '#fdf3d4', panel: 'rgba(0, 0, 0, .22)' },
  midnight:  { bg1: '#2a2250', bg2: '#120d2b', accent: '#ff8fb8', text: '#f6e9ff', panel: 'rgba(0, 0, 0, .25)' },
  charcoal:  { bg1: '#3a3a3f', bg2: '#1c1c20', accent: '#d9b25f', text: '#f4efe3', panel: 'rgba(0, 0, 0, .2)' },
  emerald:   { bg1: '#14705a', bg2: '#0a3d2f', accent: '#f2d27a', text: '#effaf4', panel: 'rgba(0, 0, 0, .2)' },
  wine:      { bg1: '#6d1f3a', bg2: '#3a0f20', accent: '#f5c6a5', text: '#fff1ea', panel: 'rgba(0, 0, 0, .22)' }
};

/* ---------- Borders (23) — e = emoji used for the four corners ---------- */
const BORDERS = [
  { v: 'classic',      l: 'Classic' },
  { v: 'double',       l: 'Double line' },
  { v: 'dotted',       l: 'Dotted' },
  { v: 'thin',         l: 'Thin line' },
  { v: 'thick',        l: 'Thick' },
  { v: 'dashed',       l: 'Dashed' },
  { v: 'groove',       l: 'Groove' },
  { v: 'rounded',      l: 'Rounded' },
  { v: 'shadow',       l: 'Offset shadow' },
  { v: 'inner-line',   l: 'Inner line' },
  { v: 'triple',       l: 'Triple line' },
  { v: 'dotted-inner', l: 'Dotted inner line' },
  { v: 'brackets',     l: 'Corner brackets' },
  { v: 'hearts',       l: 'Hearts corners',    e: '💖' },
  { v: 'floral',       l: 'Floral corners',    e: '🌸' },
  { v: 'stars',        l: 'Star corners',      e: '⭐' },
  { v: 'sparkle',      l: 'Sparkle corners',   e: '✨' },
  { v: 'ribbon',       l: 'Ribbon corners',    e: '🎀' },
  { v: 'butterfly',    l: 'Butterfly corners', e: '🦋' },
  { v: 'roses',        l: 'Rose corners',      e: '🌹' },
  { v: 'leaves',       l: 'Leaf corners',      e: '🍃' },
  { v: 'crowns',       l: 'Crown corners',     e: '👑' },
  { v: 'balloons',     l: 'Balloon corners',   e: '🎈' }
];

/* ---------- Background patterns (11) — drawn in the theme's accent colour ---------- */
const PATTERNS = {
  none:     { label: 'None' },
  hearts:   { label: 'Hearts',   size: [48, 48],
    svg: c => `<path d='M24 37C9 26 10 13 19 13c3 0 5 2 5 4 0-2 2-4 5-4 9 0 10 13-5 24z' fill='${c}'/>` },
  stars:    { label: 'Stars',    size: [50, 50],
    svg: c => `<polygon points='25,7 29.5,19.5 43,19.5 32,27.5 36,41 25,33 14,41 18,27.5 7,19.5 20.5,19.5' fill='${c}'/>` },
  dots:     { label: 'Polka dots', size: [26, 26],
    svg: c => `<circle cx='13' cy='13' r='2.6' fill='${c}'/>` },
  stripes:  { label: 'Diagonal stripes', size: [22, 22],
    svg: c => `<path d='M-6 6L6-6M0 22L22 0M16 28L28 16' stroke='${c}' stroke-width='3' fill='none'/>` },
  grid:     { label: 'Grid',     size: [32, 32],
    svg: c => `<path d='M32 0H0V32' fill='none' stroke='${c}' stroke-width='1.2'/>` },
  diamonds: { label: 'Diamonds', size: [44, 44],
    svg: c => `<path d='M22 5L39 22 22 39 5 22z' fill='none' stroke='${c}' stroke-width='1.6'/>` },
  confetti: { label: 'Confetti', size: [140, 140],
    svg: c => `<circle cx='20' cy='24' r='4' fill='${c}'/>` +
      `<rect x='70' y='14' width='10' height='4' rx='1' fill='${c}' transform='rotate(35 75 16)'/>` +
      `<circle cx='112' cy='40' r='3' fill='${c}'/>` +
      `<rect x='34' y='78' width='11' height='4' rx='1' fill='${c}' transform='rotate(-30 39 80)'/>` +
      `<circle cx='86' cy='88' r='5' fill='none' stroke='${c}' stroke-width='2'/>` +
      `<rect x='118' y='104' width='10' height='4' rx='1' fill='${c}' transform='rotate(60 123 106)'/>` +
      `<circle cx='18' cy='118' r='3' fill='${c}'/>` +
      `<path d='M60 120l5 8 5-8' fill='none' stroke='${c}' stroke-width='2'/>` },
  flowers:  { label: 'Flowers',  size: [64, 64],
    svg: c => `<g fill='${c}'><circle cx='40' cy='32' r='5.5'/><circle cx='34.5' cy='39.6' r='5.5'/>` +
      `<circle cx='25.5' cy='36.7' r='5.5'/><circle cx='25.5' cy='27.3' r='5.5'/><circle cx='34.5' cy='24.4' r='5.5'/></g>` +
      `<circle cx='32' cy='32' r='3' fill='#fff'/>` },
  waves:    { label: 'Waves',    size: [40, 20],
    svg: c => `<path d='M0 10Q10 0 20 10T40 10' fill='none' stroke='${c}' stroke-width='1.8'/>` },
  plus:     { label: 'Sparkle crosses', size: [36, 36],
    svg: c => `<path d='M18 10v16M10 18h16' stroke='${c}' stroke-width='2.4' stroke-linecap='round'/>` }
};

function patternUrl(key, color) {
  const p = PATTERNS[key];
  if (!p || !p.svg) return null;
  const [w, h] = p.size;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${p.svg(color)}</svg>`;
  return { url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`, size: `${w}px ${h}px` };
}

/* ---------- Element references ---------- */
const $ = id => document.getElementById(id);

const el = {
  types: $('types'), themes: $('themes'), typeSearch: $('typeSearch'), typeEmpty: $('typeEmpty'),
  inTitle: $('inTitle'), inSub: $('inSub'), inName: $('inName'), inMsg: $('inMsg'),
  inFrom: $('inFrom'), inDate: $('inDate'), inSeal: $('inSeal'),
  inPhoto: $('inPhoto'), removePhoto: $('removePhoto'),
  inBorder: $('inBorder'), inPattern: $('inPattern'),
  inTitleFont: $('inTitleFont'), inFont: $('inFont'), inMsgFont: $('inMsgFont'), inSigFont: $('inSigFont'),
  cert: $('cert'), stage: $('stage'), stageWrap: $('stageWrap'),
  cTitle: $('cTitle'), cSub: $('cSub'), cName: $('cName'), cMsg: $('cMsg'),
  cFrom: $('cFrom'), cDate: $('cDate'), cSeal: $('cSeal'), cDeco: $('cDeco'),
  cPhoto: $('cPhoto'), cPhotoImg: $('cPhotoImg'),
  btnPdf: $('btnPdf'), btnPng: $('btnPng'), btnShuffle: $('btnShuffle'), btnReset: $('btnReset'), status: $('status')
};

let currentType = 'love';
let currentTheme = 'rose';
let photoData = '';

/* ---------- Build the buttons, swatches and dropdowns ---------- */
// certificate buttons, grouped under a heading for each category
Object.entries(CATS).forEach(([catKey, catLabel]) => {
  const h = document.createElement('div');
  h.className = 'type-cat';
  h.textContent = catLabel;
  el.types.appendChild(h);

  Object.entries(TEMPLATES).filter(([, t]) => t.cat === catKey).forEach(([key, t]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'type-btn';
    b.dataset.key = key;
    b.dataset.search = (t.label + ' ' + t.title + ' ' + catLabel).toLowerCase();
    b.textContent = t.label;
    b.addEventListener('click', () => loadTemplate(key));
    el.types.appendChild(b);
  });
});

// search box: hide buttons (and empty headings) that do not match
function filterTypes() {
  const q = el.typeSearch.value.trim().toLowerCase();
  let anyShown = false;
  let heading = null, headingHasMatch = false;

  const closeHeading = () => { if (heading) heading.hidden = !headingHasMatch; };
  Array.from(el.types.children).forEach(node => {
    if (node.classList.contains('type-cat')) {
      closeHeading();
      heading = node;
      headingHasMatch = false;
    } else if (node.classList.contains('type-btn')) {
      const show = !q || node.dataset.search.includes(q);
      node.hidden = !show;
      if (show) { headingHasMatch = true; anyShown = true; }
    }
  });
  closeHeading();
  el.typeEmpty.hidden = anyShown;
}
el.typeSearch.addEventListener('input', filterTypes);

Object.entries(THEMES).forEach(([key, t]) => {
  const s = document.createElement('div');
  s.className = 'swatch';
  s.dataset.key = key;
  s.title = key;
  s.style.background = `linear-gradient(135deg, ${t.bg2} 50%, ${t.accent} 50%)`;
  s.addEventListener('click', () => { currentTheme = key; render(); });
  el.themes.appendChild(s);
});

BORDERS.forEach(b => {
  const o = document.createElement('option');
  o.value = b.v;
  o.textContent = b.l;
  el.inBorder.appendChild(o);
});

Object.entries(PATTERNS).forEach(([key, p]) => {
  const o = document.createElement('option');
  o.value = key;
  o.textContent = p.label;
  el.inPattern.appendChild(o);
});

function fillFontSelect(sel) {
  Object.entries(FONT_GROUPS).forEach(([type, label]) => {
    const g = document.createElement('optgroup');
    g.label = label;
    FONTS.filter(f => f.t === type).forEach(f => {
      const o = document.createElement('option');
      o.value = f.n;
      o.textContent = f.n;
      o.style.fontFamily = fontCss(f);
      g.appendChild(o);
    });
    sel.appendChild(g);
  });
}
[el.inTitleFont, el.inFont, el.inMsgFont, el.inSigFont].forEach(fillFontSelect);

/* ---------- Helpers ---------- */
function todayText() {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function loadTemplate(key) {
  const t = TEMPLATES[key];
  currentType = key;
  currentTheme = t.theme;
  el.inTitle.value = t.title;
  el.inSub.value = t.sub;
  el.inName.value = t.name;
  el.inMsg.value = t.msg;
  el.inSeal.value = t.seal;
  el.inBorder.value = t.border;
  el.inPattern.value = t.pattern;
  el.inTitleFont.value = t.titleFont;
  el.inFont.value = t.nameFont;
  el.inMsgFont.value = t.msgFont;
  el.inSigFont.value = t.sigFont;
  if (!el.inFrom.value) el.inFrom.value = 'Your Name';
  if (!el.inDate.value) el.inDate.value = todayText();
  el.cDeco.textContent = t.deco;
  render();
}

/* shrink the message a little if it would not fit inside the frame */
function fitMessage() {
  const mf = fontOf(el.inMsgFont.value);
  const len = el.inMsg.value.length;
  let size = (len > 340 ? 16 : len > 260 ? 17.5 : len > 180 ? 19 : 21) * mf.k;
  el.cMsg.style.fontSize = size + 'px';

  // measure the real content (not the corner decorations, which stick out of the frame)
  const frame = el.cert.querySelector('.frame');
  const footer = frame.querySelector('.c-footer');
  const limit = () => frame.clientHeight - parseFloat(getComputedStyle(frame).paddingBottom);
  let guard = 0;
  while (footer.offsetTop + footer.offsetHeight > limit() + 1 && size > 11 && guard++ < 40) {
    size -= 0.5;
    el.cMsg.style.fontSize = size + 'px';
  }
}

/* make sure the chosen fonts are really loaded, then re-fit the text */
function fontJobs() {
  return [
    [el.inTitleFont.value, el.inTitle.value],
    [el.inFont.value, el.inName.value],
    [el.inMsgFont.value, el.inMsg.value],
    [el.inSigFont.value, el.inFrom.value]
  ].map(([n, txt]) => document.fonts.load(`40px ${fontCss(fontOf(n))}`, txt || ' ').catch(() => {}));
}

function ensureFonts() {
  if (!document.fonts || !document.fonts.load) return;
  Promise.all(fontJobs()).then(fitMessage);
}

/* ---------- Render the live preview ---------- */
function render() {
  const th = THEMES[currentTheme];
  const c = el.cert;

  c.style.setProperty('--bg1', th.bg1);
  c.style.setProperty('--bg2', th.bg2);
  c.style.setProperty('--accent', th.accent);
  c.style.setProperty('--text', th.text);
  c.style.setProperty('--panel', th.panel || 'rgba(255, 255, 255, .35)');

  // border
  const b = BORDERS.find(x => x.v === el.inBorder.value) || BORDERS[0];
  c.dataset.border = b.v;
  c.dataset.corners = b.e ? 'yes' : 'no';
  c.style.setProperty('--corner', b.e ? `"${b.e}"` : '""');

  // background pattern
  const pat = patternUrl(el.inPattern.value, th.accent);
  c.style.setProperty('--pat', pat ? pat.url : 'none');
  if (pat) c.style.setProperty('--pat-size', pat.size);

  // text
  el.cTitle.textContent = el.inTitle.value;
  el.cSub.textContent = el.inSub.value;
  el.cName.textContent = el.inName.value;
  el.cMsg.textContent = el.inMsg.value;
  el.cFrom.textContent = el.inFrom.value;
  el.cDate.textContent = el.inDate.value;
  el.cSeal.textContent = el.inSeal.value || '★';

  // fonts
  const tf = fontOf(el.inTitleFont.value);
  const nf = fontOf(el.inFont.value);
  const mf = fontOf(el.inMsgFont.value);
  const sf = fontOf(el.inSigFont.value);

  // title (script fonts look better in normal case and a bit larger)
  const isScript = tf.t === 'script';
  el.cTitle.style.fontFamily = fontCss(tf);
  el.cTitle.style.textTransform = isScript ? 'none' : 'uppercase';
  el.cTitle.style.letterSpacing = isScript ? '1px' : '3px';
  el.cTitle.style.fontWeight = (tf.t === 'serif' || tf.t === 'sans') ? '700' : '400';
  const tl = el.inTitle.value.length;
  const tBase = isScript ? 56 : 42;
  el.cTitle.style.fontSize = Math.round(tBase * (tl > 30 ? .68 : tl > 24 ? .8 : tl > 18 ? .92 : 1)) + 'px';

  // name — long names shrink so they always fit
  const nl = el.inName.value.length;
  const nBase = nf.t === 'script' ? 74 : 56;
  el.cName.style.fontFamily = fontCss(nf);
  el.cName.style.fontSize = Math.round(nBase * (nl > 30 ? .65 : nl > 22 ? .78 : nl > 14 ? .92 : 1)) + 'px';

  // message + signature
  el.cMsg.style.fontFamily = fontCss(mf);
  el.cFrom.style.fontFamily = fontCss(sf);
  el.cFrom.style.fontWeight = '400';
  el.cFrom.style.fontSize = (sf.t === 'script' ? 32 : 20) + 'px';
  fitMessage();

  if (photoData) {
    el.cPhotoImg.src = photoData;
    el.cPhoto.hidden = false;
    el.removePhoto.hidden = false;
  } else {
    el.cPhoto.hidden = true;
    el.removePhoto.hidden = true;
  }

  document.querySelectorAll('.type-btn').forEach(x => {
    const on = x.dataset.key === currentType;
    x.classList.toggle('active', on);
  });
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.key === currentTheme));

  ensureFonts();
}

/* ---------- Scale the 1000px certificate to fit the screen ---------- */
function fitPreview() {
  const w = el.stageWrap.clientWidth;
  const scale = Math.min(1, w / 1000);
  el.stage.style.transform = `scale(${scale})`;
  el.stageWrap.style.height = (707 * scale) + 'px';
}

/* ---------- Live editing ---------- */
['inTitle', 'inSub', 'inName', 'inMsg', 'inFrom', 'inDate', 'inSeal'].forEach(id =>
  el[id].addEventListener('input', render)
);
['inBorder', 'inPattern', 'inTitleFont', 'inFont', 'inMsgFont', 'inSigFont'].forEach(id =>
  el[id].addEventListener('change', render)
);

el.inPhoto.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => { photoData = ev.target.result; render(); };
  reader.readAsDataURL(file);
});
el.removePhoto.addEventListener('click', () => {
  photoData = '';
  el.inPhoto.value = '';
  render();
});

/* random look — keeps your text, changes only the style */
el.btnShuffle.addEventListener('click', () => {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  currentTheme = pick(Object.keys(THEMES));
  el.inBorder.value = pick(BORDERS).v;
  el.inPattern.value = pick(Object.keys(PATTERNS));
  el.inTitleFont.value = pick(FONTS).n;
  el.inFont.value = pick(FONTS.filter(f => f.n !== 'Amatic SC')).n;
  el.inMsgFont.value = pick(READABLE).n;
  el.inSigFont.value = pick(SIGNATURES).n;
  render();
  setStatus('🎲 New look! Press again for another one.');
});

el.btnReset.addEventListener('click', () => {
  photoData = '';
  el.inPhoto.value = '';
  loadTemplate(currentType);
  setStatus('Reset to the original template.');
});

/* ---------- Export ---------- */
function setStatus(msg) { el.status.textContent = msg; }

function safeFileName() {
  const base = (el.inName.value || 'certificate').trim().replace(/[^\w\- ]+/g, '').replace(/\s+/g, '-');
  return `${base || 'certificate'}-${currentType}`;
}

async function captureCertificate() {
  if (typeof html2canvas === 'undefined') {
    throw new Error('Libraries failed to load. Please check your internet connection.');
  }
  if (document.fonts && document.fonts.load) await Promise.all(fontJobs());
  if (document.fonts && document.fonts.ready) await document.fonts.ready;
  fitMessage();

  return html2canvas(el.cert, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    width: 1000,
    height: 707,
    onclone: doc => {
      // remove the preview scaling in the copy so the capture is full size
      const stage = doc.getElementById('stage');
      stage.style.transform = 'none';
      const wrap = doc.getElementById('stageWrap');
      wrap.style.height = 'auto';
      wrap.style.overflow = 'visible';
    }
  });
}

async function downloadPdf() {
  el.btnPdf.disabled = true;
  setStatus('Creating your PDF…');
  try {
    const canvas = await captureCertificate();
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 297, 210);
    pdf.save(safeFileName() + '.pdf');
    setStatus('✅ PDF downloaded! Check your Downloads folder.');
  } catch (err) {
    console.error(err);
    setStatus('❌ ' + (err.message || 'Something went wrong. Please try again.'));
  } finally {
    el.btnPdf.disabled = false;
  }
}

async function downloadPng() {
  el.btnPng.disabled = true;
  setStatus('Creating your image…');
  try {
    const canvas = await captureCertificate();
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = safeFileName() + '.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setStatus('✅ Image downloaded!');
  } catch (err) {
    console.error(err);
    setStatus('❌ ' + (err.message || 'Something went wrong. Please try again.'));
  } finally {
    el.btnPng.disabled = false;
  }
}

el.btnPdf.addEventListener('click', downloadPdf);
el.btnPng.addEventListener('click', downloadPng);

/* ---------- Start ---------- */
window.addEventListener('resize', fitPreview);
loadTemplate('love');
fitPreview();
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fitMessage(); fitPreview(); });
