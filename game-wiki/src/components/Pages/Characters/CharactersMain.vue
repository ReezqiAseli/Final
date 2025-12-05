<template>
  <div class="page-shell page-bg-characters min-h-screen flex flex-col font-['Finger_Paint'] text-white">
    
    <main class="flex-1 w-full max-w-7xl mx-auto px-5 py-10 flex flex-col items-center box-border">
      <article class="w-full bg-slate-900/80 border-2 border-emerald-500 rounded-[20px] p-6 md:p-10 flex flex-col items-center gap-10">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl">Characters</h1>
          <p class="text-lg md:text-xl mt-2 opacity-80">See all available Characters in Jujutsu Shenanigans</p>
        </div>

        <div class="flex flex-col items-center gap-5 w-full">
          <div class="relative w-full max-w-md">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 opacity-50 text-lg">🔍</span>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search Characters..." 
              class="w-full py-3 pl-10 pr-4 rounded-full border border-slate-700 bg-[#050a14] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div class="flex flex-wrap justify-center gap-5 bg-black/20 backdrop-blur-sm py-2.5 px-10 rounded-full border border-white/5">
            <FilterButton
              v-for="filter in filters"
              :key="filter"
              :label="filter"
              :active="activeFilter === filter"
              size="md"
              @click="activeFilter = filter"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          <div 
            class="group relative bg-[#0d141e] border border-slate-800 rounded-xl p-4 flex flex-col gap-4 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500"
            v-for="(char, index) in filteredCharacters"
            :key="index"
            @click="openCharacterModal(char)"
          >
            <div class="w-full aspect-video bg-slate-900 rounded-lg overflow-hidden flex items-center justify-center">
              <div class="w-full h-full flex items-center justify-center transition-colors" :style="{ backgroundColor: char.color + '20' }">
                <img :src="char.image" :alt="`${char.name} portrait`" class="w-full h-full object-cover" />
              </div>
            </div>
            
            <div class="flex flex-col gap-1">
              <h2 class="text-2xl flex items-center gap-2" :style="{ color: char.color }">
                <svg viewBox="0 0 24 24" class="w-3 h-3 fill-current">
                  <path d="M12 2L2 22h20L12 2z"/>
                </svg>
                {{ char.name }}
              </h2>
              <p class="text-sm text-slate-400 leading-relaxed">{{ char.summary }}</p>
            </div>
          </div>
        </div>
      </article>
    </main>

    <div 
      v-if="selectedCharacter" 
      class="fixed inset-0 bg-black/70 flex justify-center items-start pt-30 p-5 z-50 backdrop-blur-sm"
      @click="closeCharacterModal"
    >
      <div class="bg-[#0f2c4a] border border-slate-800 rounded-2xl w-full max-w-[800px] max-h-[800px] p-6 md:p-6 relative overflow-y-auto scrollbar-hide" @click.stop>
        <button class="absolute top-3 right-3 text-white text-2xl hover:text-emerald-500 transition-colors" @click="closeCharacterModal">x</button>

        <div class="flex flex-col md:flex-row gap-5 items-start md:items-center mb-6">
          <img :src="selectedCharacter.image" :alt="`${selectedCharacter.name} portrait`" class="w-28 h-28 object-cover rounded-xl border-2 border-slate-800" />
          <div>
            <p class="uppercase tracking-widest text-xs opacity-70 mb-1">{{ selectedCharacter.type }}</p>
            <h2 class="text-3xl md:text-4xl text-white">{{ selectedCharacter.name }}</h2>
          </div>
        </div>  

        <div>
          <h3 class="text-xl mb-3">Skill Loadout</h3>
          
          <div class="flex flex-wrap justify-center gap-2 bg-black/20 backdrop-blur-sm py-2 px-4 rounded-full border border-white/5 mb-5">
            <FilterButton
              v-for="category in availableSkillCategories"
              :key="category.key"
              :label="category.label"
              :active="activeSkillCategory === category.key"
              size="lg" 
              class="flex-shrink-0"
              @click="setSkillCategory(category.key)"
            />
          </div>
          <ul class="space-y-3">
            <li 
              v-for="skill in currentSkills" 
              :key="skill.name"
              class="bg-slate-900 border border-slate-800 rounded-xl p-3 md:p-4"
            >
              <button class="w-full flex justify-between items-center text-left group" @click="toggleSkill(skill.name)">
                <div class="pr-4">
                  <span class="inline-block font-bold text-emerald-500 mb-1">{{ skill.name }}</span>
                  <p 
                    class="text-slate-300 text-sm leading-relaxed" 
                    v-html="skill.desc"
                    @click="handleDescriptionClick"
                  ></p>
                  <ul 
                    v-if="skill.subItems && skill.subItems.length > 0" 
                    class="list-disc list-outside pl-5 mt-2 space-y-1"
                  >
                    <li 
                      v-for="(item, i) in skill.subItems" 
                      :key="i" 
                      class="text-slate-300 text-sm leading-relaxed"
                    >
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <span 
                  class="text-xl text-slate-300 transition-transform duration-200"
                  :class="{ 'rotate-180': activeSkill === skill.name }"
                >⌄</span>
              </button>
              
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <div v-if="activeSkill === skill.name" class="mt-4 border border-slate-700 rounded-xl p-2 bg-[#0b111a]">
                  <video 
                    v-if="skill.preview.endsWith('.mp4')"
                    autoplay loop muted playsinline 
                    class="w-full rounded-lg object-cover"
                  >
                    <source :src="skill.preview" type="video/mp4"/>
                  </video>
                  <img v-else :src="skill.preview" :alt="skill.name" class="w-full rounded-lg object-cover" />
                </div>
              </transition>
            </li>
            
            <li v-if="!currentSkills.length" class="p-5 text-center text-slate-500 border border-dashed border-slate-700 rounded-xl italic">
              Belum ada skill di kategori ini.
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Footer from '@/components/Reusable/Footer.vue';
import FilterButton from '@/components/Reusable/FilterButton.vue';
// Characters
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
// gifs
import captionGifs from '@/assets/img/gifs/caption.gif';
import LapseBlueGif from '@/assets/img/gifs/LapseBlue25.gif';

const searchQuery = ref('');
const activeFilter = ref('All');
const selectedCharacter = ref(null);
const activeSkill = ref(null);
const activeSkillCategory = ref('base');
const skillCategories = [
  { key: 'passive', label: 'Passive' },
  { key: 'base', label: 'Base Skills' },
  { key: 'awakening', label: 'Awakening' },
  { key: 'superAwakening', label: 'Super Awakening' },
  { key: 'special', label: 'Special' },
];

const defaultSkillPreview = 'https://media1.tenor.com/m/gFWrsd6_SvkAAAAd/jujutsu-kaisen-shenanigans.gif';
const defaultCharacterSummary = 'Explore all available characters with unique abilities and playstyles';

const availableSkillCategories = computed(() => {
  if (!selectedCharacter.value) {
    return skillCategories.filter(category => category.key !== 'superAwakening' && category.key !== 'passive');
  }

  return skillCategories.filter(category => {
    const skills = selectedCharacter.value?.skillSets?.[category.key];
    return Array.isArray(skills) && skills.length > 0;
  });
});

const filters = ['All', 'Completed', 'Early Access', 'Base Only', 'Overpowered', 'Developer'];

const characters = [
  {
    name: 'Honored One',
    type: 'Completed',
    color: '#3498db',
    image: gojoImg,
    summary: `"Throughout Heaven and Earth, I alone am the Honored One."`,
    skillSets: {
      base: [
        { name: 'Lapse Blue', desc: 'The user attracts the opponent towards them, then suspends them in place to kick them skyward. Youre able to follow up with the special immediately after the kick to deal additional damage.', preview: LapseBlueGif },
        { name: 'Reversal: Red', desc: 'The user manifests as a vibrant red orb that explodes with massive repulsive force when touched by anything. The orb will slow down as it travels, and if it does not contact anything, it will stop and explode anyways. A blocked Red deals half the damage but does not kill nor ragdoll.', preview: captionGifs },
        { name: 'Reversal Red (Variant)', desc: 'If the ability is followed immediately by the special, the user will teleport behind the enemy and materialize upside down, before sending out the projectile. (If this variant is used on an airborne target, then this will negate the immediate wake up from ragdoll.)'},
        { name: 'Reversal Red (Counter)', desc: `If the previous variant was used during a target's action such as a move or dash, they will be stunned in place unable to react to the projectile coming from the user announcing: "赫" (pronounced "Aka", and means "Red") as they send it forwards.`},
        { name: 'Rapid Punches', desc: 'The user hits the enemy with a spinning kick then locks them in place, performing a quick barrage of punches on them before then sending the final blow that ragdolls the enemy forwards in a slightly left angle. While normally unblockable, this move cannot connect on a blocking player if they are about to get up from ragdoll.'},
        { name: 'Twofold Kick', desc: 'The user kicks their enemy up, anchoring them in the air, and guaranteeing an unblockable second kick that bounces the target higher given the user is uninterrupted. The first kick grants melee immunity for a short while.'},
      ],
      awakening: [
        { name: 'Six Eyes', desc: `Once the Awakening is activated, the user removes their blindfold and their eyes start to glow blue while punching their palm, along with the words "Let's get" "...A little crazy".`},
        { name: "0.2 Second Infinite Void", desc: 'By using the special during the Awakening sequence, the player activates an "Alternate Awakening" where they immediately cast their Domain Expansion, Infinite Void, but only for 0.2 seconds. This distributes the sure-hit effect of the domain in such a manner that it leaves any nearby target helpless for 7 seconds as the user prepares to rush them at unbelievable speeds with relentless strikes split into 3 phases. After the first phase, the user is able to hold the head of any dead target they come across. After the rush ends, the user is gasping for air with all their moves on cooldown and no Awakening meter. Though vulnerable during this state, they are able to gain i-frames if they manage to collect 2 heads.'},
        { name: 'Lapse Blue Max', desc: 'The player unleashes a controllable blue orb that sucks in everything near it. Using this move in the air keeps you airborne and allows you to control the orb much better. Will linger if something dies in it.'},
        { name: 'Reversal Red Max', desc: `The user fires a powerful red orb in the direction they're facing. If it hits, it'll ragdoll the enemy, doing less damage the farther they were. Just like Lapse Blue MAX, casting it in the air causes you to levitate and aim with your mouse, but it makes you go a little higher than the previous move.`},
        { name: 'Reversal Red Max (Variant)', desc: 'If the user uses their special while the move is activating, the Red will return to the user, damaging themselves if it does not hit an enemy. If it does collide with an enemy, they will be pushed to the user, who then delivers a Black Flash, knocking them down.'},
        { name: 'Hollow Purple', desc: 'The user combines the amplified (Blue) and the reversal (Red) to create an imaginary purple mass that rushes forward, destroying anything in its way. There is a small area between the user and the purple mass where enemies will not take damage, so be careful where you shoot it from the ground. Similar to the other moves, using it while in the air will cause the user to levitate and get a 360° aim. This can shatter most domains from the outside.'},
        { name: 'Infinite Void', desc: 'A pop-up appears, showing the user crossing their fingers, saying the words "Domain Expansion: Infinite Void" as it pulls anyone around them in a radius into this domain. This domain stops any and all movement from enemies by overloading their minds with endless stimuli and knowledge, leaving them in an effectively catatonic state, until the domain ends. The domain lasts for about 14 seconds.'},
        { name: 'Hollow Nuke', desc: 'Killing someone with Lapse Blue Max will make it stays in place for a few seconds, use Rversal Red Max to create a Hollow Nuke that deals massive damage in a large radius around the orb.'},
      ],
      special: [
        { name: 'Limitless', desc: 'The user raises their hand before teleporting to an enemy. Requires 6% of the Awakening Bar, and grants low endlag.' },
        { name: 'Limitless (Variant)', desc: 'When used on an airborne enemy, the user lands an air kick, knocking the target towards the floor with a slight ragdoll.' },
      ],
    },
  },
  {
    name: 'Perfection',
    type: 'Completed',
    color: '#9b59b6',
    image: mahitoImg,
    summary: `Tell me, Yuji Itadori... have you ever stopped to count how many curses you've killed? No, right? Me neither. Like I care about how many people I've killed. I'm sure I'll eventually forget about you too!"`,
    skillSets: {
      base: [
        { name: 'Stockpile', desc: `Utilizing a transfigured human in the shape of a purple hammer, the user hops and slams down on their opponent.` },
        { name: 'Soul Fire', desc: `By using Idle Transfiguration on oneself, the user manifests an arm able to fire transfigured humans as projectiles in the shape of bullets. The first two transfigured humans will only stun, while the last will cause ragdoll and missing it punishes the user with heavy endlag.`},
        { name: 'Focus Strike', desc: `Amplifying their fist with cursed energy, the user strikes a target in the torso, slightly pushing them backwards with stun.`},
        { name: 'Focus Strike (Variant)', desc: `By pressing the move again while their arm is fully wound back, the user turns their simple blow into a heavy Black Flash if landed. This sends anyone hit by it flying away.`},
        { name: 'Chainwhip', desc: `When using Focus Strike while in Blade Mode, the user swings their fist like usual, but mid-swing, their arm transforms into a chainwhip that swings upward and knocks anybody it catches behind the user, effectively stunning them.`},
        { name: 'Body Repel', desc: 'The user combines four transfigured humans into an amalgamation that rams anybody infront of it, destroying anything in its path. Body Repel is uncounterable and can be steered by turning.'},
        { name: 'Body Repel (Variant)', desc: `By using Focus Strike while Body Repel is on wind-up, the user rides inside the Body Repel at high speeds, capturing anyone in their path. Unlike the normal Body Repel, the amalgamation will simply move forwards. This variant does not put Focus Strike on cooldown nor require it to be off cooldown to use.`},
      ],
      awakening: [
        { name: 'Essence Of The Soul', desc: `The player who initiated the awakening sequence get a message box pop-up that reads: "LET'S KICK IT UP A NOTCH!". As they declare this, they regurgitate a stack of transfigured humans from their body and release a swarm of vibrant, worm-like creatures, each with unique faces. Anyone standing too close to the player during this will take 15 damage and get ragdolled upwards. While unblockable, the attack can still be countered.`},
        { name: 'Awakening Black Flash', desc: `When pressing their Awakening Button, the user will lunge forward and punch whatever is in front of them, performing a black flash and disabling ragdoll cancel if landed on an enemy. Pressing the awakening button again during the dash will cause the player to perform the black flash earlier, instead of having to wait until the dash animation is over. This attack grants i-frames to the user and will consume about 10% of their Awakening meter, regardless of whether or not it landed successfully.`},
        { name: 'Idle Transfiguration', desc: `The user lunges forward, running a short distance. If they hit a person, they will dash past, flinging the opponent forward and ending the ability. Hitting the same person a 2nd time will cause their head to explode after a short period of time. If the user hits someone under 20 HP, their head explodes regardless of whether or not they were already hit by this move. Killing someone with this move resets the Idle Transfiguration, allowing you to chain the attack on multiple people. This move shares its cooldown with the Awakening Black Flash.`},
        { name: 'Body Disfigure (Drill Splitter)', desc: `When performing Body Disfigure in Normal Mode, the user turns their feet into horse hoofs to do a ranged dropkick forward. If an opponent is hit, they will get knocked down, and the user will create a drill on their hand to drill into the knocked down enemy. The target is left ragdolled for a small time after the attack is finished.`},
        { name: 'Body Disfigure (Heart Piercer)', desc: `If Body Disfigure was instead used in Blade Mode, the user will get raised into the air by a cloud of tendrils. They then walk using them for a short period, leaving destruction in their wake as they damage anyone they step upon.`},
        { name: 'Body Disfigure (Force Grab)', desc: `If Body Disfigure was used in Club Mode, the user will quickly grab the closest target with a giant hand, immobilizing them. Using the move again will slam the target to the ground, damaging it and crushing players hit by it, while using the special will toss the target away. On the target's screen, a bar will appear on the hand, with text telling them to jump in order to fill the bar and escape the grasp. If they do so, the arm will regress and put them down. Getting hit will also cancel the force grab.`},
        { name: 'Spike Wrath', desc: `The user transforms themselves into a blob-like form and spikes any targets close to them, before slamming any that were caught into the ground. This move is effective for crowd control, and can even allow you to land your domain expansion. Although it can be blocked, the user can just move around the blocker, so it just delays the inevitable, usually.`},
        { name: 'Embodiment Of Self-Perfection', desc: `When this move is used, your domain will be expanded which is an empty void with hands forming a flower-like pattern. Anyone caught in this domain gets a bar on to their side. If a player is close to the domain caster, their bar will start to drain, emptying in a few seconds of just standing near the caster. If the bar completely empties, that target's body will get fully transfigured and explode, dying instantly. Additionally, the caster can deal damage to speed up the bar depletion. This domain has the longest windup of all domains.`},

      ],
      superAwakening: [
        { name: 'Instant Spirit Body Of Distorted Killing', desc: `For the user to progress into their Super Awakening, they must successfully land the Awakening Black Flash twice in order to fill the Super Awakening Bar (small white bar on the normal Awakening Bar). Once done correctly, they begin to morph into their true form by putting their hands to their face, and swinging them down, causing an amalgamation of faces to cover them, before it disappears and the player is visible with a pair of sharp, blade-like extensions growing from their elbows and two message boxes saying: 'AFTER I KILL YOU' '...I'LL TRULY BE BORN!!!'.` },
        { name: 'Sinister Spurs', desc: `Upon using M1s, the player utilizes their razor sharp joints to add a lethal edge to their close-combat capabilities, by lunging forward towards their target during each M1. The damage of these M1s is also higher than normal, as the first 2 hits deal 4 each, while the last 2 deal 5 each.`},
        { name: 'Distorted Dash', desc: `When dashing, the user crouches downwards for a second before launching forwards and slicing several times in a circular formation.`},
        { name: 'Widespread Strikes', desc: `The user crouches down before rushing forward with afterimages, numbering 8, circling around an area which slowly fills with a purple glow. Anyone caught inside is then trapped and the user dashes around, unleashing a flurry of slices. The user then ends it with one last powerful punch. This move can hit other players if they're close enough to the hitbox, and grants total i-frames after the crouch.`},
        { name: 'Face Blitz', desc: `The player dashes forwards and grabs the target by their face, proceeding to jump around 3 times before doing one last massive jump and slamming the targets face into the ground, causing a huge AoE of block damage. If used on a ragdolled airborne target (primarily after being launched by Crushing Rushdown), the user will skip to the last leap.`},
        { name: 'Crushing Rushdown', desc: `Sending several tendrils forward, the user grasps their opponent and forcefully rams into them, carrying them around for a long distance, before throwing them up into the air. This can be paired with Face Blitz to slam them from far up. While charging, anyone that the user bumps into will be knocked back, taking damage.`},
        { name: 'Head Splitter (Counter)', desc: `The user performs a stance, resembling their block but done at a slower pace. If struck during this animation, the user gets behind the attacker, spinning in slow motion as the target, momentarily confused, turns to see the user who then dashes through them, swiftly slicing their head clean off. This counter can hit multiple people at once due to its extended hitbox, and the more players hit, the less damage dealt (starting from 3).` },
      ],
      special: [
        { name: "Self Transfiguration", desc: `The user utilizes their technique into changing the shape of their arms, altering their M1s and front dash in the process. There are 2 forms excluding normal: Blade Mode and Club Mode. Using a front dash or Focus Strike's chainwhip will disable the special for about 1 second.` },
        { name: 'Blade Mode', desc: `Compared to regular basic attacks, Blade Mode M1s deal less damage (2 + 2 + 3 + 3) but are 0.05s faster. During this mode, the user’s front dash turns into an instant slice where they crouch for a moment before then teleporting forward, slicing and stunning anyone in front of them.`},
        { name: 'Club Mode', desc: `Compared to regular basic attacks, Club Mode M1s deal more damage (4 + 4 + 5 + 5) but are much slower. Additionally, the first 2 hits will deal half their damage when blocked, while the last 2 hits will bypass block entirely. During this mode, the user’s front dash becomes an unblockable forward spin attack that will deal damage to any nearby targets, knocking them down.`},
        { name: 'Soul Reserve', desc: `When holding a Soul noBG Transfigured Human or Soul noBG Flesh, the user can eat the item to conserve it and store it inside of them by using the special. They are able to store an infinite amount of these items, and can pull them out by blocking and M1ing at once. If this was done while they were holding another item, then the Transfigured Human/Flesh will be automatically thrown.`},
      ],
    },
  },
  {
    name: 'Vessel',
    type: 'Completed',
    color: '#e74c3c',
    image: yujiImg,
    summary: `"I am you."`,
    skillSets: {
      passive: [
        { name: 'Tiger Of West Junior High', desc: `The user's melee basic attacks (M1s) are prioritised over others, allowing them to override the damage and stun from incoming M1s to favor their own. On top of that, these basic attacks are 0.05 seconds faster than other characters', reducing the M1 windup speed from 0.25s from 0.2s.` },
      ],
      base: [
        { name: 'Cursed Strikes', desc: `The user swiftly dashes forward as their eyes glow menacingly. If the attack connects with an opponent, they will release a flurry of punches and finishing with a right calf kick, leaving them immobilized. While this move has a huge hitbox, it doesn't reset your M1s, and you cannot front dash for roughly 1s after the attack is over.`},
        { name: 'Cursed Strikes (Variant)', desc: `The user jumps into the air and then launches themselves towards the ground with a powerful dropkick. If used from high altitude (such as the top of the towers) this can grant immense distance. Feinting this attack can also aid in climbing higher ground.`},
        { name: 'Crushing Blow', desc: `The user grabs the enemy by the torso and slams them into the ground twice, launching the enemy upwards after the 2nd slam. If missed, the initial hit will release a shockwave that briefly stuns nearby players. During the target's fall, you are able to sneak an M1 in or even follow up with a well-timed move.`},
        { name: 'Crushing Blow (Variant)', desc: `The dashes across the air, grabs the enemy, and performs the same attack. Feinting this move allows you to take advantage of the initial hop without putting it on cooldown, offering incredible mobility.`},
        { name: 'Divergent Fist', desc: `The user winds their arm back and lands a decent blow with their fist before the delayed cursed energy launches the opponent back. The first hit is blockable but the second isn't.`},
        { name: 'Divergent Fist (Variant)', desc: `If pressed again as the user pulls their fist back and their body flashes white, they will unleash a Black Flash, blasting the enemy away with black sparks emanating from their fist.`},
        { name: 'Divergent Fist (Counter)', desc: `If the cursed energy lagging behind the first hit ends up interrupting an opponent's action (such as blocking or using a move), then they will be stunned from the impact for a short rather than getting ragdolled.`},
        { name: 'Blackflash Chain', desc: `If Divergent Fist's Black Flash lands on an enemy's back, the move will deal reduced damage, and will neither go on cooldown nor ragdoll the target, allowing the user to follow up with the attack again, starting a chain. Black Flashes can be chained a maximum of four times, each time resetting your side dash's cooldown, with the 4th blow being a heavy delayed Black Flash. M1s and front dashes will be disabled for a short while after a chained Black Flash.`},
        { name: 'Manji Kick (Counter)', desc: `The user raises their arm and one of their legs up. When this counter is triggered from close range, the user performs a kick from Taido Martial arts as they swing their leg across doing an upwards roundhouse kick, hitting the opponent and knocking them to the side. At further range, the user will evade the incoming projectile and quickly swoop in on the attacker while spinning.`}
      ],
      awakening: [
        { name: 'King Of Curses', desc: `When initiating the awakening sequence, the player faints and immediately wakes up saying: "You're such an annoying brat." as black tattoos appear on their face, along with a red menacing aura around their body.`},
        { name: 'Shrine', desc: `The user's melee M1s are replaced with weaker Dismantle slashes possessing longer range but are also blockable from behind. Uppercuts and downslams are disabled, and none of the slashes have any endlag on miss/block except the 4th.`},
        { name: 'Cleave', desc: `The user winds their arm back to grab the opponent. Using the secondary blade of their cursed technique, Cleave, they send a multitude of slashes through their body and fling them away.`},
        { name: 'Dismantle', desc: `The user swings their arm forward, activating the primary blade of their cursed technique, Dismantle, which unleashes a barrage of slashes that deal damage to the opponent. If there are no opponents nearby, this slashes do not appear. If the slashes are be blocked, the target will suffer reduced damage but cannot die to the attack.`},
        { name: 'Dismantle (Variant)', desc: `The user jumps into the air, before doing a flip and throwing a slash with Dismantle. Unlike its grounded counterpart, the slash will appear even with no opponents nearby.`},
        { name: 'Open', desc: `The user summons fire from their hands as they proceed clap them and perform an arrow-firing gesture while in the process of forming the flames into an arrow. Afterwards, the user aims forward, projecting the arrow forward at high velocity, which produces a large and tall explosion upon impact. Uncounterable by anything.`},
        { name: 'Rush', desc: `The user leaps forward in a straight line. Once they reach a player, they will be dragged in front of the user's path while swinging their arms around like a maniac. After a few seconds, the user will kick the opponent up into the air then jump with them to slam them back down to the ground.`},
        { name: 'Malevolent Shrine', desc: `The inner part of the domain resembles a black void, with slashes appearing everywhere. In the middle, a temple-like structure sits, it is not solid, and you can walk through it. The domain will create a series of non-stop slashes that damage enemies, totalling almost 220 damage for 110 slashes. Enemies inside this can survive while blocking but they will still take damage (only about 25%). The domain lasts for about 18 seconds.`},
        { name: 'World Cutting Slash', desc: `By using Rush during Dismantle's windup, Open, and then Cleave, the user will chant the lines: “SCALE OF THE DRAGON”, “RECOIL”, “TWIN METEORS” before swinging their arm and releasing a large horizontal slash that cuts the world itself, bypassing all counters. 
        This move can be activated as long as Dismantle and Cleave are off cooldown but will reset Open's cooldown as if it was just used and double Dismantle's cooldown each time. The user will gain i-frames once Cleave has been used, and the slash will deal less damage the more people hit by it. Despite this, it will deal increased damage to domain borders.`},
        { name: 'World Cutting Slash (Variant)', desc: `If the user starts the move during the air, they shall perform the entire World Cutting Slash midair, making it significantly harder to cancel, but also harder to aim.`},
      ],
      special: [
        { name: 'Combat Instinct', desc: `A feint that cancels an M1 or one of your first 3 moves that you're currently using when pressed, refunding the cooldown at the cost of ~3% Awakening if available (Awakening not required to feint). It can be used any time before the hitbox comes out, but don't try to cut it too close. Can be used with Crushing Blow's Aerial variant to gain distance.`},
        { name: 'Combat Instinct (Variant)', desc: `Triggering the special when standing near a throwable will make the user throw a punch that shoots the throwable at the nearest target. Doing this will require 3% of the user's Awakening meter.`},
      ],
    },
  },
  {
    name: 'Ten Shadows',
    type: 'Completed',
    color: '#2ecc71',
    image: megumiImg,
    summary: `"I don’t care if I’m right or wrong. I only believe in my conscience. I will follow my conscience and save people. If you disagree with that then.. let’s agree to curse each other!" `,
    skillSets: {
      base: [
        { name: 'Rabbit Escape', desc: `The player summons a swarm of rabbits from the floor to attack a target. Enemies other than the target will not be hit by the rabbits, as they follow and hit the target no matter what, each dealing minor damage to the opponent, allowing them to still block, attack and even side dash after already being hit by a rabbit. The rabbits will stop spawning if the user is hit.` },
        { name: 'Rabbit Escape (Variant)', desc: `Using Rabbit Escape during Lurking Shadow allows you to hop as your rabbits send you upwards in the air out of your shadow, ragdolling nearby foes. This attack is counterable.` },
        { name: 'Nue', desc: `The player summons a winged shikigami behind them, Nue, to swoop in from the skies down to their cursor direction. If thy user was pointing towards their opponent though, Nue will fly towards the target's position to electrify them, traveling faster to ragdolled targets and disabling their ragdoll cancel. This move cannot be used after Rabbit Escape on grounded targets, and Nue's ragdoll will not be true while the user is awakened.` },
        { name: 'Nue (Variant)', desc: `Pressing your special during the move's windup will allow you grab onto Nue's leg, letting you fly for a short duration. This variant will put Lurking Shadow on cooldown, but doesn't require it to be off cooldown to be used.`},
        { name: 'Toad', desc: `Summon a giant frog by your left side that shoots out its tongue to wrap around the target and pull them towards itself. The target will flash with a purple circle when targeted by Toad.`},
        { name: 'Wells Unknown Abyss', desc: `Using Nue during Toad's startup will combine both shikigamis, creating the Well's Unknown Abyss, which is a swarm of tiny flying toads that will grab the target, slam them to the ground, and then launch them into the air. This will not put Nue on cooldown and can be used even if it was.`},
        { name: 'Divine Dog: Totality', desc: `The first usage of this move will summon the Divine Dog to the user's right, while the next 3 uses will command it to attack the closest enemy within line of sight. The shikigami will perform 2 claw swipes before finishing off with a bite, each hit ragdolling the enemy away. If the enemy blocks one of these attacks, the dog will be unable to attack for one second. After the bite, the Divine Dog will dissipate, putting the move on cooldown again. The same outcome happens if the user gets ragdolled.`},
        { name: 'Divine Dog: Totality (Variant)', desc: `Using Divine Dog: Totality during Lurking Shadow will cause the dog to leap out of the shadow and charge forward, biting anything in its path. This variant is uncounterable.` },
      ],
      awakening: [
        { name: 'Insanity', desc: `Upon initiating the Awakening sequence, the player kneels and raises both arms toward the sky, thinking to themselves: "Picture it in your head! With no boundaries!", before announcing: "Oh whatever... here we go!".` },
        { name: 'Switch', desc: `During the Awakening, pressing the Awakening button will switch between your awakened and base movesets, giving you access to a total of 8 moves.`},
        { name: 'Max Elephant', desc: `Summon a massive elephant to stomp the chosen area with its weight. The attack has medium range from where it can be summoned, and will disable the ragdoll cancel of any target hit. If held, a red circle will appear, showing the area where the elephant will be land on.` },
        { name: 'Great Serpent', desc: `When used, the player will hop in the air, then summon the Great Serpent Orochi, a giant serpentine shikigami with the ability to fly. The user of this move will turn into the serpent and control it for about 2 seconds depending on where they look. If the Great Serpent catches somebody, the move will last for an additonial 3 seconds while applying a poison effect on the grabbed targets, slowly draining their health for 9 seconds despite being unable to kill them. This move disables the target's ragdoll escape.`},
        { name: 'Shadow Swarm', desc: `Summon two dark shaded clones of yourself and run forward for about 2.5 seconds. Running into an enemy unleashes a barrage of attacks before launching the victim upwards with a metal bat. Your shadow clones can get stuck from an obstacle during your rush, but if you land the attack, they will instantly come back to you.`},
        { name: 'Mahoraga', desc: `Activate while looking into the general direction of an opponent to force them to partake in a ritual, immediately draining 40% of your Awakening bar as you chant the words: "With this treasure...", "I summon..." then perform an interruptible stance for three seconds. If successful, you will summon the Eight-Grip Sword Divergent Sila Divine General, Mahoraga, and take control of him as he smacks your body away. As Mahoraga, you obtain a different moveset and stats, along with your Awakening Bar getting replaced by a Ritual meter. The amount of initial Ritual you get after the summon is proportional to how much Insanity you had before initiating this move. 
        (Due to having different stats and mechanics, <span class="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer trigger-mahoraga">Mahoraga</span> has been classified as his own character. Click the highlighted name if you wish to check out his assigned page.)`},
        { name: 'Domain Invasion: Chimera Shadow Garden', desc: `When using Shadow Swarm in front of an opponent's domain, the “Ten Shadows” technique user lays out their own domain, “Chimera Shadow Garden,” to create a hole on the border allowing all players to freely enter or leave the domain except for the user themselves. Due to the strain of maintaining the portal, they will remain unable to move or act as their health bar depletes until the portal is closed by using Shadow Swarm again, getting hit, or having no health left to spare. 
        The following sure-hit effects will be disabled while Chimera Shadow Garden is active: Infinite Void's stun, Malevolent Shrine's slashes, and Embodiment Of Self-Perfection's transfiguration meter drain.`}
      ],
      special: [
        { name: 'Lurking Shadows', desc: `Sink into your shadows for a short period to move faster, though you remain vulnerable to attacks.` },
        { name: 'Lurking Shadows (Variant)', desc: `When using Lurking Shadow while holding an item or throwable, the user stores that item/throwable within their shadow. Only one item can be stored at a time, and if the user is holding an item/throwable while an item/throwable has already been stored, the special cannot be used. Using an M1 during Lurking Shadow will retrieve the stored item.` },
      ],
    },
  },
  {
    name: 'Eight-Handled Sword Divergent Sila Divine General Mahoraga',
    type: 'Summon',
    color: '#a0aec0',
    image: 'https://static.wikia.nocookie.net/jujutsu-kaisen/images/2/23/Mahoraga_Anime_Design.png',
    isHidden: true,
    summary: 'The strongest shikigami of the Ten Shadows Technique.',
    skillSets: {
      passive: [
        { name: 'Ritual', desc: `Instead of a regular Awakening Bar, Mahoraga possesses a Ritual Bar that lasts for much shorter and drains Mahoraga's health when empty. However, Mahoraga can refill this bar by landing any move or M1 he possess, excluding Ground Pitch and World Slash.` },
        { name: 'Attack Mode: Sword of Extermination', desc: `Generally, all of Mahoraga’s basic attacks are able to break destructible blocks, can deal damage to domain borders, and have a greater range than normal. While in Attack Mode, these basic attacks are also faster than other characters.`},
        { name: 'Defense Mode: Parry', desc: `When initiating an M1 while in Defense Mode, Mahoraga swiftly goes into a block stance, ready to counter any incoming attack. Upon a successful parry, Mahoraga will glow in red while push any attackers in front of him, dealing damage while restoring some of his Ritual Bar progress. Some ranged attacks will be deflected in the direction Mahoraga is facing, and can harm anyone it collides with.`},
        { name: 'Special Mode: Sword of Extermination', desc: `While in Special Mode, Mahoraga's M1s are able to bypass block on their 3rd and 4th hits.`},
      ],
      base: [
        { name: 'Divine Pummel', desc: `Mahoraga forcefully picks up the opponent and slams them on the ground 3 times before tossing them away.` },
        { name: 'Ground Pitch', desc: `Mahoraga grabs a chunk of debris from the surrounding environment to then throw it at his opponent. The projectile will be thrown at the nearest target in Mahoraga's field of vision, with a hitbox scaling with the debris' size.`},
        { name: 'Grounds Pitch (Variant)', desc: `If the opponent is close enough when this move is used, they will also be picked up with the debris, then thrown away, taking more damage.`},
        { name: 'Earthquake', desc: `Mahoraga slams his fist into the ground, causing an AOE vibration that causes anyone near the impacted area to ragdoll to the floor.`},
        { name: 'Earthquake (Variant)', desc: `By holding the move then releasing as the outer box closes in on the inner one, Mahoraga will release a second larger shockwave, that will lift enemies momentarily off the ground.` },
        { name: 'Attack Mode: Takedown', desc: `Mahoraga gets ready to dash in a split second towards the target and punches them at an upwards angle. Grants a shorter cooldown if landed.`},
        { name: 'Defense Mode: Adaptation', desc: `Mahoraga gets ready to adapt to any incoming attack. If done correctly, Mahoraga will gain several buffs: `,
        subItems: [
          `The Ritual Bar will refill to the maximum.`,
          `Slight healing.`,
          `Damage reduction to the attack's type (Melee, Bullet, Explosion, Swam, and Domain) starting from 10%, and rising by 20% for each subsequent use to the same attack type, up to 70%. Adapting to a new attack type overrides the previous adaptation and applies a 10% reduction to the new attack type.`,
        ],
        },
        { name: 'Special Mode: World Slash', desc: `Mahoraga is able to perform a powerful ranged slash that cuts through space itself by winding up a swing of its Sword of Extermination. The slash will keep going in a straight line, piercing through targets. Has no i-frames whilst doing so.`},
      ],
      awakening: [],
      special: [
        { name: 'Adaptation Wheel', desc: `Above the Ritual Bar lies a wheel with an icon that dictates Mahoraga's current mode. You can cycle through three modes by pressing your Awakening button and you can enter that mode with your Special button, or simply quickswitch to the next mode with your Special. Each mode will grant Mahoraga a different fourth move, though they abide by the same cooldown: `,
        subItems: [
          `The Attack Mode, represented by a red sword, grants access to "Takedown."`,
          `The Defense Mode, represented by a green shield, grants access to "Adaptation".`,
          `The Special Mode, represented by a four-pointed blue star, grants access to "World Slash."`,
        ],
        },
      ]
    }
  },
  {
    name: 'Restless Gambler',
    type: 'Completed',
    color: '#2ecc71',
    image: hakariImg,
    summary: `"And me? I love the fever."`,
    skillSets: {
      base: [
        { name: 'Reserve Ball', desc: `The user flicks a small steel ball; if the enemy is close, it causes ragdoll. If the enemy is not nearby, the projectile will only stun the target for a short time. Can bounce or ricochet off surfaces.` },
        { name: 'Reserve Ball (Variant)', desc: `When Shutter Doors is used during the move's windup, the user will manifest the shutter doors when the steel ball lands or travels its maximum distance. Both moves retain their original properties, so if the user is too close to an enemy, the steel ball will ragdoll the enemy out of the doors before they close. You are unable to use this variant if Shutter Doors is on cooldown or 2 seconds after Door Guard was used.` },
        { name: 'Shutter Doors', desc: `The user can summon the shutter doors from the "Private Pure Love Train" pachinko game, which crushes the enemy and temporarily stuns them. If the user is at mid-range while the cursor is on the target, the doors will still lock onto the enemy and appear at their location instead of materializing near the user. Using this move will set your M1 count to the 3rd melee.` },
        { name: 'Shutter Doors (Variant)', desc: `If the Shutter Doors missed or got blocked, then they will linger for about 5 seconds before disappearing. Jumping on them will cause the user to bounce high in the air, causing the doors to shatter. If a ragdolled enemy falls on them (after an uppercut for example), they will bounce 3 times instead, taking damage each fall.`},
        { name: 'Rough Energy', desc: `The user winds up their fist, collecting sharp cursed energy into it to punch the enemy with great force, sending them flying. This move's windup is long, making it counterable at times, so it's better to uppercut into it if the opponent has wasted their evasive.`},
        { name: 'Rough Energy (Variant)', desc: `If Rough Energy is used in the air, the user will head upwards for a split second, collecting sharp cursed energy into their legs before bluntly stomping the ground and causing a mini shockwave launching the target skyward.`},
        { name: 'Fever Breaker', desc: `The player delivers a ranged kick that sends the opponent toward two shutter doors, then follows up with another kick to launch them to an adjustable trajectory by facing its direction before the follow-up. This move can be landed after an uppercut, though the opportunity to do so is brief.`}
      ],
      awakening: [
        { name: 'Jackpot Loop', desc: 'Instantly reroll the slot machine up to three times.' },
        { name: 'Infinite Beatdown', desc: 'Lock an enemy in a rhythm minigame to shred their HP.' },
      ],
      special: [
        { name: 'Door Guard', desc: `The user protects themselves with two shutter doors. If struck during this, they will punch through the doors, repelling the enemy. However, if hit by a projectile or throwable object, the doors will merely shatter.` },
        { name: 'Idle Death Gamble', desc: `Upon activating their Awakening, the user gains invincibility as their domain is opened, initiating a cutscene. Once the cutscene concludes, all players can freely move and act again. Rainbow text appears at the top left, detailing the domain's mechanics. Once the user lands or performs 2 visual moves (Reserve Balls, Shutter Doors, Fever Breaker, Door Guard), a random Richii scenario will trigger, where Tze will try to reach a certain destination: (More stars mean a higher Jackpot chance.)`,
          subItems: [
            `Transit Card Richii (☆☆★): In this scenario, Tze is walking towards a train checkpoint. If Tze passes through the train checkpoint, the user will enter the Jackpot state. If Tze flies away, the user must retry.`,
            `Travel Emergency Richii (☆★★): In this scenario, Tze is running to the male bathroom. If Tze goes in, the user will enter their Jackpot state. If Tze falls down, the user must retry.`,
            `(Colors of the second visual attack also come into place, in order from least to most chance: Green, Red, and Gold) 
            Should a user hit the jackpot on attempts 1, 2, or 3, the Awakening will last for 1 minute and 40 seconds. 
            If they instead achieve the 4th attempt's guaranteed jackpot, the period will be halved, lasting only for 50 seconds. 
            If the user rolls an odd-numbered jackpot, such as 777, the subsequent Idle Death Gamble will feature an increased chance of a jackpot on the first 3 attempts. 
            If the user rolls an even-numbered jackpot, such as 666, the subsequent Idle Death Gamble will feature faster Richii scenarios.`,
          ]
         },
         { name: 'Renewal', desc: `To activate this ability, you must land Reserve Balls on a target while within your domain. Once these conditions are met, using Reverse Balls again will trigger the renewal effect, which returns you and your target to your previous positions while resetting your HP to the state it was back when the Reserve Ball landed, undoing any damage you took before using this ability. You have 8 seconds to trigger this effect once the Reserve Ball lands.`},
      ],
    },
  },
  {
    name: 'Switcher',
    type: 'Completed',
    color: '#e67e22',
    image: todoImg,
    summary: 'Todo weaponizes Boogie Woogie swaps to confuse defenses before gorilla strikes land.',
    skillSets: {
      base: [
        { name: 'Boogie Woogie', desc: 'Swap places with any target you clap at, confusing combos and positioning.' },
        { name: 'Heavy Slam', desc: 'Follow up swaps with crushing elbows and knees that break guard.' },
        { name: 'Brother’s Rally', desc: 'Call Yuji for tandem strikes that extend every launcher.' },
      ],
      awakening: [
        { name: 'Unstoppable Clap', desc: 'Boogie Woogie cooldown resets instantly for a short time.' },
        { name: 'Gorilla Mode', desc: 'Gain hyper armor and empowered grapples after each swap.' },
      ],
      special: [
        { name: 'Chain Swap', desc: 'Swap multiple enemies sequentially to break formations.' },
        { name: 'Best Friend Assist', desc: 'Summon an NPC ally for combo extensions after claps.' },
      ],
    },
  },
  {
    name: 'Defense Attorney',
    type: 'Completed',
    color: '#f1c40f',
    image: higurumaImg,
    summary: 'Higuruma prosecutes foes with Judgeman, stripping tools before clean finishers.',
    skillSets: {
      base: [
        { name: 'Copy Technique', desc: 'Mimic an ally’s skill for one cast, adapting to any matchup.' },
        { name: 'Rika Guard', desc: 'Manifest Rika to shield and counter-grab over-aggressive foes.' },
        { name: 'Pure Love Katana', desc: 'Channel Rika into the blade for a decisive, armor-breaking finisher.' },
      ],
      awakening: [
        { name: 'Manifest Rika', desc: 'Full manifestation fights by your side, doubling your output.' },
        { name: 'Love Overflow', desc: 'Gain continuous cursed energy regen and upgraded copies.' },
      ],
      special: [
        { name: 'Judgment Chain', desc: 'Bind enemies with spirit threads that explode after a delay.' },
        { name: 'Oathseeker', desc: 'Place a binding vow on opponents, lowering their damage if broken.' },
      ],
    },
  },
  {
    name: 'Puppet Master',
    type: 'Early Access',
    color: '#e74c3c',
    image: mechamaruImg,
    summary: 'Mechamaru bombards from afar while puppet overrides pin targets in place.',
    skillSets: {
      base: [
        { name: 'Simple Domain', desc: 'Deploy a compact barrier that nullifies enemy domains briefly.' },
        { name: 'Execution Slash', desc: 'Dash forward with a cursed katana swing that crits silenced enemies.' },
        { name: 'Blade Recall', desc: 'Throw your sword and snap it back to reposition while dealing chip damage.' },
      ],
      awakening: [
        { name: 'Mecha Barrage', desc: 'Summon artillery drones that pepper the arena.' },
        { name: 'Puppet Override', desc: 'Hijack an enemy input for one second, interrupting combos.' },
      ],
      special: [
        { name: 'Total Puppet Form', desc: 'Transform into a giant mech for a short destructive rampage.' },
        { name: 'Control Seal', desc: 'Tag an enemy with a seal that reflects the next projectile.' },
      ],
    },
  },
  {
    name: 'Blood Manipulator',
    type: 'Completed',
    color: '#c0392b',
    image: chosoImg,
    summary: 'Choso sculpts cursed blood into piercing beams and explosive novas.',
    skillSets: {
      base: [
        { name: 'Convergence', desc: 'Condense blood bullets for sniper-like precision hits.' },
        { name: 'Supernova', desc: 'Orbiting plasma droplets explode on command for AoE control.' },
        { name: 'Slicing Exorcism', desc: 'Unleash a spiraling slash that shreds anything too close.' },
      ],
      awakening: [
        { name: 'Flowing Red Scale', desc: 'Accelerate blood flow to boost movement and damage.' },
        { name: 'Piercing Bloodstorm', desc: 'Channel a continuous beam that can bend mid-flight.' },
      ],
      special: [
        { name: 'Crimson Armor', desc: 'Harden blood around your body, granting damage reduction.' },
        { name: 'Death Painting Pact', desc: 'Buff nearby allies from the same clan with bonus lifesteal.' },
      ],
    },
  },
  {
    name: 'Aspiring Mangaka',
    type: 'Base Only',
    color: '#8e44ad',
    image: charlesImg,
    summary: 'Charles sketches reality with cursed ink that zones, stalls, and punishes dives.',
    skillSets: {
      base: [
        { name: 'Ink Splash', desc: 'Hurl blobs of cursed ink that slow and damage over time.' },
        { name: 'Panel Shift', desc: 'Create temporary barriers that block projectiles and movement.' },
        { name: 'Manga Manifestation', desc: 'Summon ink constructs to fight alongside you.' },
      ],
      awakening: [
        { name: 'Story Arc Boost', desc: 'Enhance your next few skills with added effects.' },
        { name: 'Ink Wave', desc: 'Release a wide wave of ink that obscures vision and damages foes.' },
      ],
      special: [
        { name: 'Final Chapter', desc: 'Unleash a massive ink explosion that covers the entire arena.' },
        { name: 'Artistic Inspiration', desc: 'Regenerate cursed energy rapidly for a short duration.' },
      ],
    },
  },
  {
    name: 'Cursed Partner',
    type: 'Completed',
    color: '#2980b9',
    image: yutaImg,
    summary: 'Yuta fights beside Rika, copying techniques to counter any matchup on demand.',
    skillSets: {
      base: [
        { name: 'Copy Technique', desc: 'Mimic an ally’s skill for one cast, adapting to any matchup.' },
        { name: 'Rika Guard', desc: 'Manifest Rika to shield and counter-grab over-aggressive foes.' },
        { name: 'Pure Love Katana', desc: 'Channel Rika into the blade for a decisive, armor-breaking finisher.' },
      ],
      awakening: [
        { name: 'Manifest Rika', desc: 'Full manifestation fights by your side, doubling your output.' },
        { name: 'Love Overflow', desc: 'Gain continuous cursed energy regen and upgraded copies.' },
      ],
      special: [
        { name: 'Judgment Chain', desc: 'Bind enemies with spirit threads that explode after a delay.' },
        { name: 'Oathseeker', desc: 'Place a binding vow on opponents, lowering their damage if broken.' },
      ],
    },
  },
  {
    name: 'Star Rage',
    type: 'Base Only',
    color: '#d35400',
    image: yukiImg,
    summary: 'Yuki unleashes raw gravitational bursts that pulverize anything caught in range.',
    skillSets: {
      base: [
        { name: 'Copy Technique', desc: 'Mimic an ally’s skill for one cast, adapting to any matchup.' },
        { name: 'Rika Guard', desc: 'Manifest Rika to shield and counter-grab over-aggressive foes.' },
        { name: 'Pure Love Katana', desc: 'Channel Rika into the blade for a decisive, armor-breaking finisher.' },
      ],
      awakening: [
        { name: 'Manifest Rika', desc: 'Full manifestation fights by your side, doubling your output.' },
        { name: 'Love Overflow', desc: 'Gain continuous cursed energy regen and upgraded copies.' },
      ],
      special: [
        { name: 'Judgment Chain', desc: 'Bind enemies with spirit threads that explode after a delay.' },
        { name: 'Oathseeker', desc: 'Place a binding vow on opponents, lowering their damage if broken.' },
      ],
    },
  },
  {
    name: 'Strongest in History',
    type: 'Overpowered',
    color: '#27ae60',
    image: sukunaImg,
    summary: "Sukuna carves arenas apart with Malevolent Shrine ferocity and chilling precision.",
    skillSets: {
      base: [
        { name: 'Copy Technique', desc: 'Mimic an ally’s skill for one cast, adapting to any matchup.' },
        { name: 'Rika Guard', desc: 'Manifest Rika to shield and counter-grab over-aggressive foes.' },
        { name: 'Pure Love Katana', desc: 'Channel Rika into the blade for a decisive, armor-breaking finisher.' },
      ],
      awakening: [
        { name: 'Manifest Rika', desc: 'Full manifestation fights by your side, doubling your output.' },
        { name: 'Love Overflow', desc: 'Gain continuous cursed energy regen and upgraded copies.' },
      ],
      special: [
        { name: 'Judgment Chain', desc: 'Bind enemies with spirit threads that explode after a delay.' },
        { name: 'Oathseeker', desc: 'Place a binding vow on opponents, lowering their damage if broken.' },
      ],
    },
  },
  {
    name: 'Locust Guy',
    type: 'Base Only',
    color: '#16a085',
    image: locustImg,
    summary: 'Locust Guy drowns battlefields in devouring swarms that melt defenses.',
    skillSets: {
      base: [
        { name: 'Swarm Call', desc: 'Summon a swarm of locusts that chase and damage enemies over time.' },
        { name: 'Locust Shield', desc: 'Create a protective barrier of locusts that absorbs damage.' },
        { name: 'Plague Burst', desc: 'Release a burst of cursed energy that spreads disease among foes.' },
      ],
      awakening: [
        { name: 'Hive Mind', desc: 'Enhance locust abilities, increasing their speed and damage.' },
        { name: 'Insect Swarm', desc: 'Unleash a massive swarm that covers the battlefield, obscuring vision.' },
      ],
      special: [
        { name: 'Locust Lord Form', desc: 'Transform into a giant locust creature, gaining new powerful attacks.' },
        { name: 'Cursed Plague', desc: 'Inflict a debilitating curse on all enemies, reducing their effectiveness.' },
      ],
    },
  }
];

characters.forEach(char => {
  char.summary = char.summary ?? defaultCharacterSummary;
  const sets = char.skillSets ?? { base: [], awakening: [], superAwakening: [], passive: [], special: [] };
  if (!sets.special) sets.special = [];
  Object.keys(sets).forEach(key => {
    sets[key] = sets[key].map(skill => ({
      preview: skill.preview ?? defaultSkillPreview,
      ...skill,
    }));
  });
  char.skillSets = sets;
});

// Logic Filtering
const filteredCharacters = computed(() => {
  return characters.filter(char => {
    if (char.isHidden) return false;
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesFilter = activeFilter.value === 'All' || 
                          (activeFilter.value === 'Base Only' && char.type === 'Base Only') ||
                          (activeFilter.value === 'Completed' && char.type === 'Completed') ||
                          (activeFilter.value === 'Early Access' && char.type === 'Early Access') ||
                          (activeFilter.value === 'Overpowered' && char.type === 'Overpowered') ||
                          (activeFilter.value === 'Developer' && char.type === 'Developer');

    return matchesSearch && matchesFilter;
  });
});

const handleDescriptionClick = (event) => {
  if (event.target.classList.contains('trigger-mahoraga')) {
    const mahoragaChar = characters.find(c => c.name.includes('Mahoraga') && c.isHidden);
    
    if (mahoragaChar) {
      openCharacterModal(mahoragaChar);
    }
  }
};

const openCharacterModal = (character) => {
  selectedCharacter.value = character;
  activeSkillCategory.value = 'base';
  activeSkill.value = null;
};

const closeCharacterModal = () => {
  selectedCharacter.value = null;
  activeSkill.value = null;
};

const toggleSkill = (skillName) => {
  activeSkill.value = activeSkill.value === skillName ? null : skillName;
};

const setSkillCategory = (categoryKey) => {
  if (activeSkillCategory.value === categoryKey) return;
  activeSkillCategory.value = categoryKey;
  activeSkill.value = null;
};

const currentSkills = computed(() => {
  if (!selectedCharacter.value) return [];
  const sets = selectedCharacter.value.skillSets ?? {};
  return sets[activeSkillCategory.value] ?? [];
});
</script>

<style>
/* Hanya untuk import font, sisa styling sudah pindah ke kelas Tailwind di template */
@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap');
</style>