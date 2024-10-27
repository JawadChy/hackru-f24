import React from "react";
import { Spotlight } from "../components/ui/spotlight";
import { Music2, Sparkles, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Spotlight
          className="-top-40 right-0 md:right-60 md:-top-20"
          fill="white"
        />
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center px-4">
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-center space-x-2 ">
            <svg width="350" height="150" viewBox="0 0 1008 326" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_i_3_17)">
              <ellipse cx="779.12" cy="115.119" rx="23.6969" ry="18.4715" transform="rotate(-11.1954 779.12 115.119)" fill="url(#paint0_linear_3_17)"/>
              <rect x="768.337" y="2.4057" width="12.3908" height="112.803" transform="rotate(-11.1954 768.337 2.4057)" fill="url(#paint1_linear_3_17)"/>
              <path d="M768.63 2.71545L777.849 5.57826L758.008 44.3734L748.789 41.5106L768.63 2.71545Z" fill="url(#paint2_linear_3_17)"/>
              <path d="M32.508 85.388L10.836 82.364V69.764H145.656L148.176 112.604H131.796L124.236 84.632L59.472 82.868V155.948L105.084 155.192L109.368 134.276H122.724V193.244H109.62L105.084 171.32L59.472 170.312V242.132L98.784 244.652V257H12.348V244.652L32.508 242.132V85.388ZM229.355 259.772C209.027 259.772 193.487 253.136 182.735 239.864C172.151 226.592 166.859 208.868 166.859 186.692C166.859 172.076 169.631 159.224 175.175 148.136C180.719 137.048 188.447 128.48 198.359 122.432C208.439 116.384 219.863 113.36 232.631 113.36C248.255 113.36 260.351 117.728 268.919 126.464C277.655 135.032 282.275 147.38 282.779 163.508C282.779 173.756 282.191 181.568 281.015 186.944H194.327C194.663 203.576 198.527 217.016 205.919 227.264C213.311 237.344 223.811 242.384 237.419 242.384C244.139 242.384 251.111 241.208 258.335 238.856C265.727 236.336 271.439 233.396 275.471 230.036L280.259 241.124C275.387 246.164 268.163 250.532 258.587 254.228C249.011 257.924 239.267 259.772 229.355 259.772ZM255.059 173.588C255.563 170.06 255.815 166.448 255.815 162.752C255.647 151.832 253.295 143.264 248.759 137.048C244.391 130.664 237.419 127.472 227.843 127.472C218.099 127.472 210.287 131 204.407 138.056C198.695 145.112 195.419 156.956 194.579 173.588H255.059ZM366.43 259.772C346.102 259.772 330.562 253.136 319.81 239.864C309.226 226.592 303.934 208.868 303.934 186.692C303.934 172.076 306.706 159.224 312.25 148.136C317.794 137.048 325.522 128.48 335.434 122.432C345.514 116.384 356.938 113.36 369.706 113.36C385.33 113.36 397.426 117.728 405.994 126.464C414.73 135.032 419.35 147.38 419.854 163.508C419.854 173.756 419.266 181.568 418.09 186.944H331.402C331.738 203.576 335.602 217.016 342.994 227.264C350.386 237.344 360.886 242.384 374.494 242.384C381.214 242.384 388.186 241.208 395.41 238.856C402.802 236.336 408.514 233.396 412.546 230.036L417.334 241.124C412.462 246.164 405.238 250.532 395.662 254.228C386.086 257.924 376.342 259.772 366.43 259.772ZM392.134 173.588C392.638 170.06 392.89 166.448 392.89 162.752C392.722 151.832 390.37 143.264 385.834 137.048C381.466 130.664 374.494 127.472 364.918 127.472C355.174 127.472 347.362 131 341.482 138.056C335.77 145.112 332.494 156.956 331.654 173.588H392.134ZM459.908 69.008L439.496 66.236V55.4L480.068 50.612H480.572L486.116 54.392V242.636L507.536 244.652V257H439.496V244.652L459.908 242.384V69.008ZM555.166 91.94C549.79 91.94 545.758 90.428 543.07 87.404C540.382 84.38 539.038 80.516 539.038 75.812C539.038 70.436 540.634 65.984 543.826 62.456C547.186 58.928 551.722 57.164 557.434 57.164C563.146 57.164 567.346 58.676 570.034 61.7C572.722 64.724 574.066 68.588 574.066 73.292C574.066 79.004 572.386 83.54 569.026 86.9C565.834 90.26 561.298 91.94 555.418 91.94H555.166ZM545.086 136.544L525.934 132.008V118.652L564.994 113.864H565.498L571.294 118.4V242.636L591.454 244.652V257H524.674V244.652L545.086 242.384V136.544ZM624.468 136.544L606.324 132.008V118.4L642.36 113.864H643.116L648.408 118.4V128.984L648.156 135.032C654.204 129.656 662.184 124.784 672.096 120.416C682.008 116.048 691.5 113.864 700.572 113.864C711.156 113.864 719.304 115.88 725.016 119.912C730.896 123.944 735.012 130.16 737.364 138.56C739.716 146.792 740.892 157.964 740.892 172.076V242.636L758.532 244.4V257H698.808V244.652L714.432 242.636V171.824C714.432 161.912 713.76 154.184 712.416 148.64C711.072 142.928 708.552 138.728 704.856 136.04C701.16 133.184 695.784 131.756 688.728 131.756C682.68 131.756 676.212 133.268 669.324 136.292C662.436 139.316 656.304 142.844 650.928 146.876V242.384L668.064 244.652V257H608.592V244.652L624.468 242.384V136.544ZM939.385 259.52C929.809 259.52 922.669 257.336 917.965 252.968C913.261 248.6 910.909 241.124 910.909 230.54V133.772H892.765V122.432C893.605 122.264 895.957 121.676 899.821 120.668C903.685 119.66 906.289 118.736 907.633 117.896C910.321 116.384 912.421 113.36 913.933 108.824C915.277 105.632 916.873 100.508 918.721 93.452C920.569 86.396 921.661 82.196 921.997 80.852H936.865L937.369 117.14H979.453V133.772H937.369V211.136C937.369 220.712 937.621 227.432 938.125 231.296C938.797 235.16 940.057 237.68 941.905 238.856C943.921 240.032 947.281 240.62 951.985 240.62C956.521 240.62 961.477 240.032 966.853 238.856C972.397 237.68 976.681 236.42 979.705 235.076L983.485 246.416C979.453 249.44 972.901 252.38 963.829 255.236C954.925 258.092 946.777 259.52 939.385 259.52Z" fill="url(#paint3_linear_3_17)"/>
              </g>
              <defs>
              <filter id="filter0_i_3_17" x="10.836" y="-6.10352e-05" width="972.649" height="263.772" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="4"/>
              <feGaussianBlur stdDeviation="2"/>
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3_17"/>
              </filter>
              <linearGradient id="paint0_linear_3_17" x1="755.423" y1="115.119" x2="802.817" y2="115.119" gradientUnits="userSpaceOnUse">
              <stop stop-color="#C084FC"/>
              <stop offset="1" stop-color="#D7D0DE"/>
              </linearGradient>
              <linearGradient id="paint1_linear_3_17" x1="768.337" y1="58.8071" x2="780.728" y2="58.8071" gradientUnits="userSpaceOnUse">
              <stop stop-color="#C084FC"/>
              <stop offset="1" stop-color="#D7D0DE"/>
              </linearGradient>
              <linearGradient id="paint2_linear_3_17" x1="758.709" y1="22.113" x2="767.178" y2="26.444" gradientUnits="userSpaceOnUse">
              <stop stop-color="#C084FC"/>
              <stop offset="1" stop-color="#D7D0DE"/>
              </linearGradient>
              <linearGradient id="paint3_linear_3_17" x1="0" y1="167.5" x2="1008" y2="167.5" gradientUnits="userSpaceOnUse">
              <stop stop-color="#C084FC"/>
              <stop offset="1" stop-color="#D7D0DE"/>
              </linearGradient>
              </defs>
              </svg>

            </div>
            <h1 className="bg-gradient-to-b from-purple-50 to-purple-400 bg-clip-text py-4 text-center text-2xl font-bold text-transparent md:text-3xl -mt-10">
              Music that matches <br /> your mood
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-center text-sm text-neutral-300">
              Discover personalized playlists that evolve with your emotions.
              Our AI-powered recommendations understand your vibe and create the
              perfect soundtrack for every moment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/listen">
                <button className="group relative flex w-48 items-center justify-center overflow-hidden rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400">
                  Start Listening
                  <Heart className="ml-2 h-4 w-4" />
                </button>
              </Link>
              <button className="w-48 rounded-full border border-purple-500/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-500/10">
                How it Works
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-neutral-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">50M+</div>
                <div className="text-sm">Songs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">Spotify</div>
                <div className="text-sm">Integration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">25+</div>
                <div className="text-sm">Mood Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}