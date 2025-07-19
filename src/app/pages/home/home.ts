import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
     <div class="flex items-center justify-center min-h-screen px-4">
        <div class="flex flex-col items-center justify-center text-center filter-text">
          <!-- <div class="mb-8">
            <div class="relative">
              <div class="text-6xl md:text-8xl lg:text-9xl font-thin text-white/90 tracking-wider">
                <div class="relative inline-block">
                  <span class="relative z-10">Knot</span>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 border border-white/30 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div class="text-6xl md:text-8xl lg:text-9xl font-thin text-white/90 tracking-wider -mt-4">
                <span>Poet</span>
              </div>
            </div>
          </div> -->
          <div class="relative mb-3">
              <img
                src="img/logos/logo_plain_white_hd.png"
                alt="Band members"
                class="w-full h-80 object-cover rounded-lg"
              />
              <!-- <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg"></div> -->
            </div>

          <div class="text-white/70 text-lg md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase">
            Dreaming Metal
          </div>
        </div>
      </div>
  `,
  styleUrl: './home.css'
})
export class Home {

}
