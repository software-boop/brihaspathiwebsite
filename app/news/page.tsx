import HeroParallaxNews from '@/components/About-parallel'
import BrihaspathiMediaShowcaseFull from '@/components/BrihaspathiMediaShowcaseFull'
import MasonryGalleryPaginated from '@/components/MasonryGalleryPaginated'
import React from 'react'

function page() {
  return (
    <div className="w-full overflow-x-hidden">
{/* <MasonryGalleryPaginated/>
<BrihaspathiMediaShowcaseFull/> */}
<HeroParallaxNews/>
<MasonryGalleryPaginated/>
    </div>
  )
}

export default page