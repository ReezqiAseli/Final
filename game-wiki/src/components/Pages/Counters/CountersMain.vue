<template>
  <div class="page-shell page-bg-counters min-h-screen flex flex-col items-center font-['Finger_Paint'] text-white">
    
    <main class="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8">
      <PageWrap class="flex flex-col items-center gap-6 md:gap-8">
        <header class="text-center w-full">
          <h1 class="font-['Finger_Paint'] text-4xl md:text-5xl lg:text-6xl m-0">Counter Guide</h1>
          <p class="text-base md:text-lg lg:text-xl opacity-80 mt-2">Learn the best responses to every cursed technique</p>
        </header>

        <section class="text-center w-full">
          <h3 class="font-['Finger_Paint'] text-lg md:text-xl text-slate-300 mb-3 md:mb-5">Select Your Character:</h3>
          
          <div class="flex justify-center w-full">
            <div class="flex flex-wrap justify-center gap-2 md:gap-5 bg-black/20 backdrop-blur-sm py-2.5 px-4 md:px-10 rounded-2xl md:rounded-full border border-white/5 w-full md:w-fit mx-auto">
              <FilterButton
                v-for="char in characters"
                :key="char.id"
                size="lg"
                :active="selectedChar.id === char.id"
                @click="selectedChar = char"
                :title="char.name"
              >
                <span class="font-['Finger_Paint'] text-base">
                  {{ char.name }}
                </span>
              </FilterButton>
            </div>
            </div>
        </section>

        <div class="py-3 px-8 border-b border-emerald-500 text-center">
          <span class="text-2xl text-gray-200">Playing as {{ selectedChar.name }}</span>
        </div>

        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <div 
            v-for="(matchup, index) in currentMatchups" 
            :key="index" 
            class="bg-[#0d141e]/80 border border-emerald-700 rounded-xl p-6 transition-colors duration-200 hover:border-[#00bba6]"
          >
            <div class="flex items-center gap-4 mb-4 border-b border-white/5 pb-4">
              <div class="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0" :style="{ backgroundColor: matchup.color }">
                <img :src="matchup.img" :alt="matchup.name + ' icon'" class="w-full h-full object-cover" />
              </div>
              
              <div class="flex flex-col items-start">
                <h4 class="font-['Finger_Paint'] text-xl mb-1">VS. {{ matchup.name }}</h4>
                
                <span 
                  class="text-xl font-bold uppercase px-3 py-1 rounded-full"
                  :class="{
                    'bg-emerald-500/20 text-emerald-500': matchup.difficulty === 'Easy',
                    'bg-yellow-500/20 text-yellow-500': matchup.difficulty === 'Medium',
                    'bg-red-500/20 text-red-500': matchup.difficulty === 'Hard'
                  }"
                >
                  {{ matchup.difficulty }}
                </span>
              </div>
            </div>
            
            <div>
              <p class="text-slate-400 text-xl leading-relaxed text-base">{{ matchup.tip }}</p>
            </div>
          </div>

          <div v-if="currentMatchups.length === 0" class="col-span-full text-center py-10 text-slate-500 italic">
            <p>Select a character to see counter strategies.</p>
          </div>
        </section>
      </PageWrap>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import FilterButton from '@/components/Reusable/FilterButton.vue';
import PageWrap from '@/components/Reusable/PageWrap.vue';

// Character Images
import charlesImg from '@/assets/img/Charles.png';
import chosoImg from '@/assets/img/Choso.png';
import gojoImg from '@/assets/img/Gojo.png';
import hakariImg from '@/assets/img/Hakari.png';
import higurumaImg from '@/assets/img/Higuruma.png';
import locustImg from '@/assets/img/Locust.png';
import mahitoImg from '@/assets/img/Mahito.png';
import mechamaruImg from '@/assets/img/Mechamaru.png';
import megumiImg from '@/assets/img/Megumi.png';
import sukunaImg from '@/assets/img/Sukuna.png';
import todoImg from '@/assets/img/Todo.png';
import yujiImg from '@/assets/img/Yuji.png';
import yukiImg from '@/assets/img/Yuki.png';
import yutaImg from '@/assets/img/Yuta.png';
import MahoImg from '@/assets/img/Maho.png';

// --- Data Karakter ---
const characters = [
  { id: 'honored', name: 'Honored One', img: gojoImg, color: '#3498db' },
  { id: 'perfection', name: 'Perfection', img: mahitoImg, color: '#9b59b6' },
  { id: 'vessel', name: 'Vessel', img: yujiImg, color: '#e74c3c' },
  { id: 'megumi', name: 'Ten Shadows', img: megumiImg, color: '#2ecc71' },
  { id: 'mahoraga', name: 'Mahoraga', img: MahoImg, color: '#a0aec0' },
  { id: 'gambler', name: 'Restless Gambler', img: hakariImg, color: '#2ecc71' },
  { id: 'switcher', name: 'Switcher', img: todoImg, color: '#e67e22' },
  { id: 'higuruma', name: 'Defense Attorney', img: higurumaImg, color: '#f1c40f' },
  { id: 'mechamaru', name: 'Puppet Master', img: mechamaruImg, color: '#e74c3c' },
  { id: 'choso', name: 'Blood Manipulator', img: chosoImg, color: '#c0392b' },
  { id: 'charles', name: 'Aspiring Mangaka', img: charlesImg, color: '#8e44ad' },
  { id: 'yuta', name: 'Cursed Partner', img: yutaImg, color: '#2980b9' },
  { id: 'yuki', name: 'Star Rage', img: yukiImg, color: '#d35400' },
  { id: 'sukuna', name: 'Strongest in History', img: sukunaImg, color: '#27ae60' },
  { id: 'locust', name: 'Locust Guy', img: locustImg, color: '#16a085' },
];

const selectedChar = ref(characters[0]);

const matchupDatabase = {
  honored: [
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito's range is deceptive, but your Infinity gives you the edge. Watch out for his 'Body Repel' as it can catch you off guard; use 'Reversal Red' to push him away if he gets too close. If he activates his Domain, focus on dodging rather than countering immediately."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Easy',
      tip: "Yuji struggles against zoning. Abuse 'Lapse Blue' to keep him at a distance or pull him into setups. If he tries to close the gap with 'Manji Kick', punish him with a counter or simply float out of reach."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Megumi's shikigami can be annoying distractions. Focus on the user, not the summons; 'Lapse Blue' can pull Megumi out of his defensive positions. Be careful of 'Totality' dog attacks which deal high damage if you aren't paying attention."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "A very dangerous matchup due to his adaptation mechanics. You need to burst him down quickly before he adapts to your Blue and Red. Save 'Hollow Purple' for a guaranteed hit when he is recovering from a heavy attack."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "If Hakari hits a Jackpot, do not engage him in melee. Use your superior mobility to stall out his immortality timer. Only fight back aggressively when his music stops playing."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo's 'Boogie Woogie' swap can disorient you. Keep track of his position and anticipate swaps when he claps. He lacks ranged options, so punish him with Red whenever he tries to step in."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Avoid his gavel slams, as they can break your guard. If you get caught in his Domain, you lose your technique, so play extremely defensively and rely on basic combat mechanics until it ends."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru is stationary during many attacks. Use this to your advantage by flanking him with Blue teleportation. His beam attacks are telegraphed, making them easy to dodge if you stay mobile."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso has good mid-range pressure with 'Piercing Blood'. Don't run in a straight line; strafe to avoid his beams. Close the distance quickly after he misses a shot to punish his recovery frames."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles relies on reading your moves. Mix up your attack timings to throw off his counters. His spear has reach, but 'Reversal Red' outranges him and can reset the neutral game easily."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta and Rika are a 2v1 nightmare. Try to separate them or hit both with AoE attacks like Red. Be very careful of his 'Cursed Speech' stun, which can lead into a devastating combo from Rika."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki hits incredibly hard. Do not try to block her heavy attacks; dodge them instead. Her Garuda ball kick can be intercepted with Blue if you time it right, disrupting her flow."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "The King of Curses matches your power. Watch out for 'Dismantle' which comes out instantly. Save your evasive maneuvers for his Fire Arrow, as it has a massive hitbox and deals fatal damage."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust Guy is straightforward. His attacks are predictable and lack range. Simply zone him out with Blue and Red, and he won't be able to touch you."
    }
  ],
  perfection: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Gojo's Infinity is a problem. You need to rely on your Domain Expansion to bypass it. Until you have your ult, play defensively and try to catch him with 'Body Repel' when he attacks."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Yuji will try to rush you down. Use your transfigured humans to create space. If he lands a Black Flash, use your evasive immediately to avoid the follow-up combo."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Your AoE attacks are great against his shikigami. Use your wide swings to hit both Megumi and his dogs. Don't let him set up 'Chimera Shadow Garden' or you'll be overwhelmed."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Mahoraga hits like a truck. Do not trade hits with him. Use your mobility to hit-and-run, and try to land your Domain Expansion to finish him off before he adapts to your soul manipulation."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "When Hakari is immortal, focus solely on survival. Use your shapeshifting to dodge and weave. Once his music stops, go on the offensive immediately with your soul attacks."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo will try to swap you into attacks. Keep moving unpredictably to make his swaps harder to capitalize on. Your mid-range attacks outclass his close-range brawling."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Higuruma's gavel can be annoying. Try to stay out of his melee range and use your extended limbs to poke. If he opens his Domain, just focus on dodging until it's over."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru is a big target. Your wide-range attacks will easily hit him. Close the distance to stop him from spamming beams, and he crumbles under pressure."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso's blood attacks hurt, but they are linear. Dodge sideways and close in. Your soul manipulation attacks can disrupt his charging animations."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles lacks the damage to threaten you seriously. Overwhelm him with your erratic movements and transfigured humans. He can't predict chaos."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta has high versatility. Watch out for Rika appearing behind you. Try to catch both of them in your Domain Expansion for a double kill opportunity."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki's punches break guards easily. Do not block; use your shapeshifting dodge. Punish her whiffed heavy attacks with your own combos."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna is faster and stronger. Play patiently. Wait for him to commit to a big move like Fire Arrow, then punish him during the recovery. Your Domain is your best win condition."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is just a punching bag for you. Practice your combos on him. His attacks are too slow to catch your shapeshifting body."
    }
  ],
  vessel: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Getting close to Gojo is a nightmare. Use 'Manji Kick' to close gaps unexpectedly. Try to bait out his Red before committing to a 'Black Flash' combo."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito has range, but you have speed. Rush him down relentlessly. Your punches deal soul damage naturally, so you are his natural counter. Don't let him breathe."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Ignore the frogs and dogs; go for the summoner. Megumi is weak in close combat. If he runs, chase him down with your superior sprint speed and dash attacks."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "You need to hit hard and fast. Chain your 'Black Flash' attacks to deal massive damage before he adapts. If he starts adapting to punches, use 'Divergent Fist' to mix up the timing."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "Don't fight Immortal Hakari head-on. Run and dodge until the music stops. Once he's vulnerable, unleash your full combo to take him out before he spins again."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "A brotherly brawl! Watch for his clap. If he swaps you, be ready to block immediately. You can match his melee prowess, so it comes down to who lands the first hit."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Higuruma wants to keep you at gavel length. Get in his face. If you get caught in his Domain and lose your Cursed Energy, rely on your martial arts—you're still strong without it."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru hates close range. Dodge his beams and close the gap. Once you are in melee range, he has very few options to get you off him."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso controls the mid-range. Zig-zag towards him to avoid 'Piercing Blood'. Once you're close, your frame data is better than his, so mash your attack buttons."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles is tricky but fragile. Power through his attacks. Your 'Black Flash' has armor properties that can tank his spear hits and deliver a crushing counter."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta has a sword and a ghost. It's tough. Try to isolate Yuta from Rika. Use 'Manji Kick' to knock him away from his summon, then follow up aggressively."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki hits harder than you, but you are faster. Use your speed to bait her heavy swings, then punish her recovery. Don't trade hits; you will lose."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "The King of Curses is a boss fight. Watch for the 'Dismantle' slash animation. Try to land a 'Black Flash' to stun him, but don't get greedy or he'll punish you with Fire Arrow."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is easy prey. Practice your infinite combos on him. He has no good defensive options against your rushdown."
    }
  ],
  megumi: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Gojo can ignore your summons. Use 'Rabbit Escape' to confuse him and break his lock-on. Try to catch him with 'Mahoraga' (if you have the ult) to bypass his Infinity."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito can sweep your shikigami. Keep your distance and spam 'Nue' electricity to stun him. Use 'Toad' to pull yourself away if he gets too close."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Yuji wants to punch you. Don't let him. Use 'Divine Dog' to harass him while you run away. Zone him out completely and chip away at his health."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Ironically, fighting Mahoraga is hard. Your basic shikigami won't do enough damage. You need to set up a 'Chimera Shadow Garden' trap to deal enough burst damage to kill him."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "Stall, stall, stall. Use 'Rabbit Escape' and 'Nue' to waste his Jackpot time. Hide in your shadows if you have to. Only fight when he's mortal."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo will swap with your shikigami. Be careful not to summon them too close to you, or he'll swap places and be right in your face. Keep your summons at mid-range."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Higuruma is dangerous up close. Use 'Max Elephant' to drop heavy water on him from a distance. Keep him knocked down so he can't open his Domain."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru is slow. Your 'Divine Dog: Totality' can run circles around him. Use 'Nue' to interrupt his beam charge-ups."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso's blood beams are fast. Use 'Rabbit Escape' as a shield to block the shots. Counter with 'Toad' to grab him during his cooldowns."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles can't handle multiple targets. Overwhelm him with Dog, Nue, and Toad all at once. He doesn't have the AoE to clear them."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Rika eats shikigami for breakfast. You need to play very carefully. Use 'Chimera Shadow Garden' to hide and strike from the shadows, avoiding direct confrontation."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki hits hard but is slow. Kite her with your summons. If she gets close, use 'Rabbit Escape' to create distance immediately."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna will destroy your summons instantly with 'Cleave'. Don't rely on them for defense. Use them as distractions to land a sneak attack, then retreat."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is free wins. Send your 'Divine Dog' to attack him while you stand back and watch. He can't deal with the pressure."
    }
  ],
  mahoraga: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Medium',
      tip: "You are the Gojo counter. Survive his initial burst, and your wheel will spin. Once adapted to Blue and Red, you can walk through his attacks. Watch out for Purple."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito deals soul damage, which is tricky. But your physical stats are higher. Smash him with heavy attacks. If he Domains, your adaptation might save you if you survive long enough."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Easy',
      tip: "Yuji is purely physical. You adapt to blunt force very quickly. Once the wheel spins, his punches will barely tickle you. Just brawl him."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Easy',
      tip: "Megumi's summons are weak against you. Swipe them away with your blade. Chase Megumi down; he can't run forever against your size and speed."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "Infinite Cursed Energy vs Adaptation. It's a war of attrition. If he's immortal, defend. You can't kill him, so don't waste stamina. Attack when the music stops."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo's swaps are annoying but don't hurt. Adapt to his 'Boogie Woogie' disorientation. Once you get used to the swaps, your heavy hits will crush him."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "If he confiscates your technique, you're just a big strong monster. That's usually enough. Crush him with basic attacks. His gavel won't stop you."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru's beams are easy to adapt to. Tank a few hits to spin the wheel, then walk through his ultimate attacks like they are nothing."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Poison blood is annoying. Try to finish the fight quickly before the chip damage adds up. Your blade has more range than his fists."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles's future sight doesn't matter if he can't block your hit. Your attacks are too heavy for him to parry effectively. Just swing."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta has too many different techniques. It's hard to adapt to everything. Focus on taking out Rika first to reduce his damage output."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki deals massive damage per hit. You might die before you adapt. Play more evasively than usual until the wheel spins at least once."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna knows how to kill you. He will try to use 'Fire Arrow' to one-shot you. You must interrupt his charge-up or dodge it at all costs."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is a snack. One heavy swing takes half his health. Don't even worry about strategy here."
    }
  ],
  gambler: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "You need Jackpot to survive. Use your doors to block his Blue/Red while you roll. Once Immortal, rush him down without fear, but watch out for being launched off the map."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito can't kill you if you're immortal. But his domain is dangerous if you aren't. Prioritize getting your Domain Expansion off before he does."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "A slugfest. Yuji hits hard, but you heal instantly in Jackpot. Trade hits with him; you will win the damage race because of your regeneration."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Ignore the animals. Run straight at Megumi. Your attacks have good tracking. If he hides in shadows, wait him out or use AoE moves."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Mahoraga adapts to your punches. You need to mix up your attacks. Use the environment and your 'Train Doors' to stagger him. Don't let him adapt to your rhythm."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo will swap you around. It's annoying but not fatal. Keep the pressure on. Your infinite cursed energy means you can spam attacks until he runs out of stamina."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "If he takes your Cursed Energy, you can't open your Domain. This is bad. Avoid his Domain Expansion at all costs. If you get caught, play safe until you get your CE back."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru can't burst you down fast enough. Pop your Domain, get Jackpot, and then tear his mech apart. He's too slow to escape you."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso's poison slows you down. But with Jackpot, you heal the poison. Just make sure you get the Jackpot. Use doors to block 'Piercing Blood'."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles is weak. Bully him. Even if he predicts your attack, your immortality lets you ignore his counters and keep swinging."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta has high burst damage. He might kill you before you hit Jackpot. Play defensively until you get the roll, then go crazy on him."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki hits very hard. Don't get broken. Use your doors to keep her at bay while you charge your Domain. Once immortal, you can tank her hits."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna can one-shot you with Fire Arrow even in Jackpot if the damage is high enough (or knocks you out). Be careful. Don't be mindless just because you're immortal."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is free real estate. Use him to charge your fever meter. He can't stop your domain expansion."
    }
  ],
  switcher: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Gojo is hard to touch. Use 'Boogie Woogie' to swap him into your attacks or into environmental hazards. Swap places with him when he uses Red to make him miss."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito wants to touch you. Don't let him. Swap with rocks or other players to keep distance. Only go in for a combo when you have a guaranteed opening."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Brother vs Brother. You know his moves. Swap him when he charges 'Manji Kick' to make him whiff. Your teamwork with a partner is deadly here."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Easy',
      tip: "Megumi's summons are free swap targets! Swap Megumi with his own dog to confuse him. Close the gap instantly by swapping with his Nue."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Mahoraga is a beast. Swapping him disorients him, but he hits hard. Play support if you can. If 1v1, use swaps to dodge his heavy swings."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Medium',
      tip: "If Hakari is immortal, run away. Use swaps to create massive distance. Swap him back to the start of the map if he chases you."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Higuruma's gavel has a sweet spot. Swap inside his guard to punish him. If he uses Domain, you lose your clap, so be careful."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru is a sitting duck. Swap him out of his defensive position. Swap yourself behind him to avoid his beams. Easy combo food."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Swap Choso when he fires 'Piercing Blood' to make him hit nothing. Close the distance and brawl him; your melee is better."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles relies on prediction. 'Boogie Woogie' is unpredictable. Swap constantly to mess up his future sight reads."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Swap Yuta away from Rika. Dealing with them separately is manageable. If they are together, you will get overwhelmed."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki is slow. Swap around her heavy hits. Don't try to block her; just clap and be somewhere else."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna is dangerous. Swap him when he tries to use 'Fire Arrow' to make him miss or hit a wall. Play very evasively."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is a training dummy. Practice your clap combos. Swap him into the air and slam him down."
    }
  ],
  higuruma: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "You need your Domain. If you can confiscate Gojo's Limitless, he becomes much easier. Until then, play safe and use the gavel to poke."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Confiscating Mahito's technique stops his shapeshifting. This is huge. Prioritize landing your Domain Expansion to cripple his offense."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Hard',
      tip: "Yuji doesn't care about confiscation; he punches you anyway. Keep him away with your gavel's range. Don't let him get close."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "If you confiscate his technique, his summons disappear. This is your win condition. Rush for the Domain Expansion immediately."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Mahoraga is a physical powerhouse. Confiscation might not do enough. You need the 'Executioner's Sword' to one-shot him. Play for the death penalty."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Medium',
      tip: "If you confiscate Hakari's technique, he can't Jackpot. He becomes a regular fighter. This is a very good matchup for you if you land the Domain."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Confiscating 'Boogie Woogie' makes Todo a sitting duck. He relies on swaps for defense. Take that away and punish him."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru relies entirely on his technique. Confiscate it and he's useless. Even without it, your gavel destroys his mechanical body."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso needs blood manipulation to be effective. Take it away. Watch out for his basic martial arts, but you should have the advantage."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles needs his spear and technique to predict. Confiscate it. He has no backup plan."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta has Rika and high Cursed Energy. Confiscation helps, but Rika might still be active. Be careful. Try to get the Executioner's Sword."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki without her mass technique is much less scary. She still hits hard physically, so don't get complacent. Zone her with the gavel."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Confiscating Sukuna's shrine is good, but he's still a martial arts god. And if he has the Fire Arrow, you're in trouble. Play perfectly."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust is guilty. Confiscate his technique (if he has one) or just beat him with the gavel. He's not a threat."
    }
  ],
  mechamaru: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Your beams can't penetrate Infinity. You need to rely on splash damage or wait for his cooldowns. It's a losing battle unless you catch him off guard."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito can close the gap. Keep him away with 'Ultra Cannon'. If he gets close, use your simple domain to counter his domain expansion."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Yuji has no ranged attacks. Zone him forever. Fly up if you can and rain down beams. If he gets close, you're in trouble."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Your wide AoE attacks destroy his shikigami. Blast the whole area. Don't let him set up his shadows."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Mahoraga adapts to your beams. You have limited ammo types. Try to burst him down with your Ultimate Mode before he becomes immune to everything."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "You can't kill Immortal Hakari. Fly away and stall. Save your big energy blasts for when his music stops."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo will swap you into your own beams if you aren't careful. Stop firing if he looks like he's about to clap. Play patiently."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Stay out of his gavel range. If he confiscates your technique, you are just a pile of scrap. Keep your distance at all costs."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "A beam struggle! Your cannons are stronger than his blood. Overpower him in a ranged duel. Dodge his 'Piercing Blood' and return fire."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles has no range. Blast him from across the map. He can't predict a laser to the face if he can't reach you."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta can copy your blasts or block them with Rika. It's a tough fight. Try to catch him in a large explosion."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki can punch through your armor. Don't let her get close. Use your boost to fly away and kite her with missiles."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna's 'Dismantle' cuts through your metal. He is faster and stronger. Use your Ultimate Mode immediately and hope for the best."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Target practice. Lock on and fire everything. Locust has no way to defend against your firepower."
    }
  ],
  choso: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Your blood can't touch him. It's a bad matchup. Try to use 'Supernova' to create a minefield he might accidentally step into. Otherwise, run."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Mahito is slippery. Use 'Piercing Blood' to snipe him from a distance. If he gets close, 'Flowing Red Scale' gives you the physical stats to fight back."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Big brother vs Little brother. Yuji is faster. Use 'Supernova' to control space and stop him from rushing you. Keep him at mid-range."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Snipe his summons with 'Piercing Blood'. You can clear his dogs easily. Don't let him surround you."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Mahoraga adapts to poison. This is bad. You need to deal as much damage as possible with 'Piercing Blood' before he becomes immune to it."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "Hakari heals your poison instantly in Jackpot. Stall him out with 'Flowing Red Scale' speed. Poison him the second his music stops."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo will swap out of your beam's path. Use wide attacks like 'Supernova' that are harder to dodge with a swap. Don't commit to long animations."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Higuruma wants to close in. Keep him away with blood beams. If he confiscates your technique, rely on your hand-to-hand combat skills."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru is a big target for 'Piercing Blood'. You can hit him easily. Dodge his slow missiles and keep firing."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles can't predict the speed of 'Piercing Blood'. Overwhelm him with rapid-fire attacks. He can't block them all."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta can heal your poison with RCT. It's annoying. Try to burst him down with a max output 'Piercing Blood' when he's distracted by Rika."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki hits harder. Don't trade blows. Use your range advantage. If she gets close, use 'Supernova' to knock her back."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna is too fast. 'Piercing Blood' might be too slow to hit him. Use 'Flowing Red Scale' to run away and look for third-party opportunities."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust dies to poison quickly. Hit him once and watch his health drain. Easy win."
    }
  ],
  charles: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "You can see the future, but you can't hit him through Infinity. It's hopeless unless he drops his guard. Run."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Predict his shape shifts. Use your spear to poke him safely. If he tries to touch you, you should have already seen it coming."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Yuji is straightforward. Read his punches and counter them. Don't let him overwhelm you with speed; keep him at spear length."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Predict where the summons will attack from. Stab the dogs. Press Megumi so he can't focus on summoning."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "You can see him coming, but he hits too hard to block. Dodge everything. You probably lack the damage to kill him before he adapts."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "Future sight helps you survive his Jackpot duration. Just dodge for 4 minutes and 11 seconds. Then attack."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo's swaps are instant, making them hard to predict even with future sight. Play defensively and wait for him to make a mistake."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "Don't get your spear confiscated. Keep him at max range. If you lose your weapon, you lose the fight."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Mechamaru telegraphs his attacks way too much. With your future sight, you can dodge his beams with your eyes closed. Poke him to death."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Read the trajectory of 'Piercing Blood' and sidestep. Close the distance. Choso struggles when forced into melee against a weapon user."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Rika is chaotic and hard to predict. Focus on Yuta. If you can read his sword swings, you can parry him, but watch out for the ghost."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Predict her heavy hits. Do not block them. Dodge and counter-poke. Her attacks are slow enough for you to react comfortably."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Even if you see 'Dismantle' coming, it's too fast to dodge sometimes. Sukuna is a nightmare. Try to survive."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "You can read his every move. He's too dumb to mix up his attacks. Perfect block everything and humiliate him."
    }
  ],
  yuta: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Use 'Cursed Speech' to stun him, then hit him with a Domain expansion. It's one of the few ways to bypass his defenses. Rika can tank some hits for you."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "Output positive energy (RCT) to burn him. Your sword attacks with Rika's support can overwhelm him. Don't let him touch your soul."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Yuji is tough but you have Rika. Make it a 2v1. Use 'Sky Manipulation' to deflect his punches and counter-attack."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Easy',
      tip: "Rika is the queen of curses; she eats his wolves. Overpower his summons with raw strength. Copy his shadows if you can for extra chaos."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "You have a versatile kit. Use different techniques (Sky, Speech, Dhruv's) to prevent him from adapting to one thing. Burst him with 'Love Beam'."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "If he's immortal, use 'Sky Manipulation' to stall. Bend space to hide. Once his jackpot ends, unleash Rika to finish him."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo can't swap Rika easily. Send Rika to attack him while you hang back, or vice versa. Overwhelm him with numbers."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "If he confiscates your technique, you still have Rika (usually) and a katana. You are a strong swordsman. Fight him normally."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Rika can tear through his mech armor. Use 'Cursed Speech' to stop his big attacks. He can't handle the pressure."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Heal his poison with RCT. Deflect 'Piercing Blood' with Sky Manipulation. You have the tools to counter everything he does."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles can't predict Rika. Attack him from two angles at once. He will get overwhelmed quickly."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "Yuki hits hard. Use 'Sky Manipulation' to bend her punches away from you. Let Rika do the heavy lifting while you support."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "A clash of titans. Use 'Cursed Speech' to interrupt 'Cleave'. You need to land your Domain to have a chance. Rika must tank the Fire Arrow."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Locust stands no chance. Feed him to Rika. Use 'Cursed Speech': 'Die'."
    }
  ],
  yuki: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "Your mass punches can't hit Infinity. You need a Domain to win. Until then, use Garuda to block his projectiles and stay mobile."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Medium',
      tip: "One clean hit with your mass technique can obliterate him. Don't let him touch you. Use Garuda to kick him away if he gets too close."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Medium',
      tip: "Yuji is a brawler, but you hit harder. Time your heavy punches to trade with him. You will win the trade every time due to your mass."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Easy',
      tip: "Kick Garuda through his summons. Your mass ignores their durability. Crush Megumi with a single heavy combo."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "You have the damage to one-shot him before he adapts. Charge up your biggest mass punch and aim for the head. Don't drag out the fight."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "You can't kill him in Jackpot. Use Garuda to wrap him up and stall. Once the music stops, break his bones with a mass punch."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo will try to swap. Keep Garuda close to you so he can't swap you into a bad spot. Your hits are unblockable, so force him to dodge."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "If he takes your technique, you lose your mass. That's bad. Avoid the gavel. If you keep your technique, you can break his guard easily."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "Kick Garuda at his mech. It acts like a wrecking ball. He can't tank your damage output."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Medium',
      tip: "Choso's blood is annoying. Kick Garuda through his beams. Close the distance and land one good hit to end it."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "Charles can see it coming, but he can't stop a black hole punch. Aggressively chase him down."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Yuta and Rika are tough. Use Garuda to distract Rika while you fight Yuta. Your punches can break Rika's guard."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Sukuna is dangerous. Don't whiff your heavy attacks or he will punish you. Use Garuda for mid-range pokes and wait for an opening."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "One punch. That's all it takes. Locust explodes on contact."
    }
  ],
  sukuna: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "The ultimate battle. Use 'Domain Amplification' to touch him. Time your 'Mahoraga' wheel (if available) to adapt to Infinity. Fire Arrow is your finisher."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Easy',
      tip: "You are the King of Curses. Your soul is untouchable to him. Slice him apart with 'Dismantle'. He can't do anything to you."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Easy',
      tip: "Show the brat his place. 'Cleave' destroys him at close range. If he tries to punch, just counter him. You outclass him in every way."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Easy',
      tip: "Don't kill him, you need him (lore wise). But in game? Destroy his summons with 'Cleave'. They are weak paper to you."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Medium',
      tip: "You must kill him before he adapts to slashing attacks. Use 'Dismantle' to weaken him, then finish him instantly with 'Fire Arrow'."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Medium',
      tip: "Immortal? Annoying. Just wait. Dodge his attacks until the music stops, then slice him in half. Or use Fire Arrow to out-damage his healing."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Medium',
      tip: "Todo's swaps are irritating. Use your Domain Expansion 'Malevolent Shrine' to hit everything in the area, so swapping doesn't save him."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Medium',
      tip: "If he confiscates your technique, just use martial arts. You are still stronger. If you keep your technique, 'Dismantle' him from range."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Easy',
      tip: "A big metal toy. 'Cleave' cuts right through it. Dash in and shred him. He's too slow."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Easy',
      tip: "Blood is nothing to you. Dodge 'Piercing Blood' and close the gap. One 'Cleave' ends the fight."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Easy',
      tip: "He can see his death coming. 'Dismantle' is invisible and instant. He can't block what he can't react to physically."
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Medium',
      tip: "Yuta has a lot of Cursed Energy. Use 'Malevolent Shrine' to overwhelm Rika and Yuta simultaneously. Don't let them gang up on you."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Medium',
      tip: "She hits hard. Don't tank her hits. Use your superior speed to slice her from angles she can't defend. Fire Arrow burns her mass away."
    },
    {
      name: 'Locust',
      color: '#16a085',
      img: locustImg,
      difficulty: 'Easy',
      tip: "Pathetic. Don't even use your technique. Just beat him down with your fists."
    }
  ],
  locust: [
    {
      name: 'Gojo',
      color: '#3498db',
      img: gojoImg,
      difficulty: 'Hard',
      tip: "You are a locust. He is a god. Good luck. Try to... bite him? Maybe run away."
    },
    {
      name: 'Mahito',
      color: '#9b59b6',
      img: mahitoImg,
      difficulty: 'Hard',
      tip: "He touches you, you die. Stay away. Throw rocks if you have them. Pray."
    },
    {
      name: 'Yuji',
      color: '#e74c3c',
      img: yujiImg,
      difficulty: 'Hard',
      tip: "He punches really hard. You are squishy. Try to use your extra arms to block, but it probably won't work."
    },
    {
      name: 'Megumi',
      color: '#2ecc71',
      img: megumiImg,
      difficulty: 'Medium',
      tip: "Maybe you can beat the frog? Focus on the animals. Megumi himself might be too smart for you."
    },
    {
      name: 'Mahoraga',
      color: '#a0aec0',
      img: MahoImg,
      difficulty: 'Hard',
      tip: "Run. Just run. He will adapt to your existence and delete you."
    },
    {
      name: 'Hakari',
      color: '#2ecc71',
      img: hakariImg,
      difficulty: 'Hard',
      tip: "He is immortal. You are a bug. This ends poorly for you."
    },
    {
      name: 'Todo',
      color: '#e67e22',
      img: todoImg,
      difficulty: 'Hard',
      tip: "He will swap you into a wall. Try to be smart (impossible). Just swing your arms wildly."
    },
    {
      name: 'Higuruma',
      color: '#f1c40f',
      img: higurumaImg,
      difficulty: 'Hard',
      tip: "You are definitely guilty of being a curse. The gavel will crush you."
    },
    {
      name: 'Mechamaru',
      color: '#e74c3c',
      img: mechamaruImg,
      difficulty: 'Hard',
      tip: "Big robot vs bug. Robot wins. Dodge the lasers."
    },
    {
      name: 'Choso',
      color: '#c0392b',
      img: chosoImg,
      difficulty: 'Hard',
      tip: "Poison blood kills bugs. Avoid the red stuff."
    },
    {
      name: 'Charles',
      color: '#8e44ad',
      img: charlesImg,
      difficulty: 'Medium',
      tip: "He can see the future, but maybe you are too dumb to predict? Attack randomly!"
    },
    {
      name: 'Yuta',
      color: '#2980b9',
      img: yutaImg,
      difficulty: 'Hard',
      tip: "Rika will eat you. Literally."
    },
    {
      name: 'Yuki',
      color: '#d35400',
      img: yukiImg,
      difficulty: 'Hard',
      tip: "She kicks you into orbit. Don't get hit."
    },
    {
      name: 'Sukuna',
      color: '#27ae60',
      img: sukunaImg,
      difficulty: 'Hard',
      tip: "Bow down. You are already dead."
    }
  ]
};

const currentMatchups = computed(() => {
  return matchupDatabase[selectedChar.value.id] || [];
});
</script>

<style>
/* Import Font Global */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nunito:wght@400;700&display=swap');
</style>