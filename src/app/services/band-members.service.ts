import { Injectable } from "@angular/core"

export interface BandMember {
  id: string
  name: string
  role: string
  roleIcon: string
  shortDescription: string
  longDescription: string
  image: string
  imageAlt: string
  birthDate?: string
  birthPlace?: string
  yearsActive: string
  influences: string[]
  equipment?: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
  }
}

@Injectable({
  providedIn: "root",
})
export class BandMembersService {
  private members: BandMember[] = [
    {
      id: "mitch",
      name: "Mitch",
      role: "Vocalist",
      roleIcon: "🎤",
      shortDescription:
        "The ethereal voice that guides listeners through cosmic realms, blending haunting melodies with powerful screams.",
      longDescription: `
        <p>Mitch serves as the vocal conduit between the earthly and celestial realms, channeling cosmic energies through a voice that can shift from whispered incantations to thunderous roars. His approach to vocals transcends traditional metal boundaries, incorporating elements of ambient soundscaping and meditative chanting.</p>
        
        <p>Drawing inspiration from both the silence of deep space and the violent birth of stars, Mitch's vocal style reflects the duality of the cosmos - serene yet chaotic, beautiful yet terrifying. His lyrics explore themes of consciousness expansion, astral projection, and the interconnectedness of all matter in the universe.</p>
        
        <p>Before joining Knot Poet, Mitch spent years studying Tibetan throat singing and experimental vocal techniques, which he seamlessly integrates into the band's dreaming metal sound. His live performances are known for their transcendent quality, often leaving audiences in altered states of consciousness.</p>
      `,
      image: "/img/members/mitch.png",
      imageAlt: "Mitch, the ethereal vocalist of Knot Poet, surrounded by cosmic energy",
      birthPlace: "Portland, Oregon",
      yearsActive: "2018 - Present",
      influences: ["Mikael Åkerfeldt", "Ihsahn", "Devin Townsend", "Tibetan Monks"],
      equipment: ["Shure SM7B", "TC Helicon VoiceLive", "Various Tibetan Singing Bowls"],
      socialMedia: {
        instagram: "@mitch_cosmic_voice",
      },
    },
    {
      id: "dweller",
      name: "Dweller",
      role: "Lead Guitarist",
      roleIcon: "🎸",
      shortDescription:
        "Master of atmospheric riffs and cosmic solos, weaving intricate melodies that bridge the gap between heavy and ethereal.",
      longDescription: `
        <p>Known simply as Dweller, this enigmatic guitarist crafts the sonic landscapes that define Knot Poet's unique sound. His approach to the guitar transcends traditional metal playing, incorporating ambient textures, extended techniques, and unconventional tunings to create truly otherworldly soundscapes.</p>
        
        <p>Dweller's playing style is characterized by its dynamic range - from delicate, reverb-drenched arpeggios that evoke the vastness of space to crushing, distorted riffs that capture the violent energy of colliding galaxies. His use of effects pedals and signal processing creates layers of sound that seem to exist in multiple dimensions simultaneously.</p>
        
        <p>A student of both classical composition and experimental music, Dweller brings a deep understanding of harmonic theory to the band's songwriting process. His solos are not mere displays of technical prowess, but carefully constructed journeys through emotional and spiritual landscapes that complement the band's cosmic themes.</p>
      `,
      image: "/img/members/francio.png",
      imageAlt: "Dweller playing guitar in a cosmic studio setting with ethereal lighting effects",
      birthPlace: "Reykjavik, Iceland",
      yearsActive: "2019 - Present",
      influences: ["Plini", "David Gilmour", "Tosin Abasi", "Ólafur Arnalds"],
      equipment: ["Strandberg Boden 7", "Fractal Audio Axe-FX", "Chase Bliss Mood", "Empress Reverb"],
      socialMedia: {
        instagram: "@dweller_cosmic_strings",
      },
    },
    {
      id: "ingmar",
      name: "Ingmar",
      role: "Rhythm Guitarist",
      roleIcon: "🎸",
      shortDescription:
        "The rhythmic foundation that anchors the band's cosmic explorations, creating crushing riffs with mathematical precision.",
      longDescription: `
        <p>Ingmar provides the rhythmic backbone that allows Knot Poet's cosmic explorations to soar. His approach to rhythm guitar is both technically precise and emotionally resonant, creating the foundation upon which the band's ethereal elements can flourish.</p>
        
        <p>With a background in progressive metal and jazz fusion, Ingmar brings complex polyrhythms and unconventional time signatures to the band's compositions. His riffs are carefully constructed to support the overall sonic architecture while maintaining their own distinct character and power.</p>
        
        <p>Ingmar's playing is characterized by its clarity and precision, even in the most chaotic passages. He has developed a unique palm-muting technique that creates percussive textures reminiscent of distant cosmic phenomena, adding another layer to the band's multi-dimensional sound palette.</p>
      `,
      image: "/img/members/ingo.png",
      imageAlt: "Ingmar with his guitar in a cosmic-themed practice space",
      birthPlace: "Stockholm, Sweden",
      yearsActive: "2019 - Present",
      influences: ["Meshuggah", "Periphery", "Allan Holdsworth", "Fredrik Thordendal"],
      equipment: ["Ibanez RG8", "Neural DSP Quad Cortex", "Horizon Devices Precision Drive"],
      socialMedia: {
        instagram: "@ingmar_cosmic_rhythm",
      },
    },
    {
      id: "echoes",
      name: "Echoes",
      role: "Bassist",
      roleIcon: "🎵",
      shortDescription:
        "The deep cosmic pulse that resonates through dimensions, providing both melodic counterpoint and crushing low-end foundation.",
      longDescription: `
        <p>Echoes serves as the gravitational force that holds Knot Poet's cosmic sound together. His bass playing extends far beyond traditional rhythm section duties, often taking on melodic and harmonic roles that add depth and complexity to the band's compositions.</p>
        
        <p>Drawing inspiration from both progressive rock and ambient music, Echoes employs extended techniques including harmonics, tapping, and bow work to create textures that range from subtle atmospheric elements to earth-shaking low-end power. His understanding of frequency and resonance allows him to craft bass lines that seem to vibrate at the fundamental frequency of the universe itself.</p>
        
        <p>Echoes' approach to the instrument is deeply philosophical, viewing the bass as a conduit for cosmic energy. His playing often incorporates elements of drone music and sound healing, creating sustained tones that induce meditative states in both band members and audiences.</p>
      `,
      image: "/img/members/echoes.png",
      imageAlt: "Echoes playing bass with cosmic energy waves emanating from the instrument",
      birthPlace: "Berlin, Germany",
      yearsActive: "2020 - Present",
      influences: ["Les Claypool", "Jaco Pastorius", "Tony Levin", "Colin Edwin"],
      equipment: ["Warwick Thumb 5-string", "Darkglass Microtubes", "EHX POG2", "Cello Bow"],
      socialMedia: {
        instagram: "@echoes_cosmic_bass",
      },
    },
    {
      id: "fede",
      name: "Fede",
      role: "Drummer",
      roleIcon: "🥁",
      shortDescription:
        "The rhythmic architect who constructs complex polyrhythmic structures that mirror the patterns of celestial mechanics.",
      longDescription: `
        <p>Fede brings a unique approach to drumming that combines technical precision with cosmic consciousness. His rhythmic concepts are inspired by the mathematical patterns found in nature and the universe, from the Fibonacci sequence to the orbital mechanics of planetary systems.</p>
        
        <p>His drum kit setup incorporates both traditional acoustic elements and electronic triggers, allowing him to blend organic percussion with synthesized cosmic textures. Fede's playing style seamlessly transitions between crushing metal passages and delicate ambient sections, always serving the song's emotional and spiritual journey.</p>
        
        <p>Beyond his technical abilities, Fede approaches drumming as a form of meditation and energy work. His understanding of rhythm as a fundamental force in the universe allows him to create beats that resonate on both physical and metaphysical levels, providing the temporal framework for the band's cosmic explorations.</p>
      `,
      image: "/img/members/fede.png",
      imageAlt: "Fede behind his cosmic drum kit with ethereal lighting and space-themed elements",
      birthPlace: "Milan, Italy",
      yearsActive: "2018 - Present",
      influences: ["Danny Carey", "Gavin Harrison", "Marco Minnemann", "Trilok Gurtu"],
      equipment: ["DW Collector's Series", "Zildjian K Custom", "Roland SPD-SX", "Meinl Singing Bowls"],
      socialMedia: {
        instagram: "@fede_cosmic_rhythms",
      },
    },
  ]

  getAllMembers(): BandMember[] {
    return this.members
  }

  getMemberById(id: string): BandMember | undefined {
    return this.members.find((member) => member.id === id)
  }
}
