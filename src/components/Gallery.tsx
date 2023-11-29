import { useState } from "react"
import Lightbox from "yet-another-react-lightbox"
import { Inline } from "yet-another-react-lightbox/plugins"
import 'yet-another-react-lightbox/styles.css'

const Gallery = ({ slides, inlineStyles, carousel }: any) => {
    const [open, setIsOpen] = useState(false)
    const [index, setIndex] = useState(0)
  
    let images = slides.map((src: any) => {
      return {
        src,
      }
    })
  
    const updateIndex = ({ index: current }: { index: number }) => setIndex(current)
  
    return (
      <>
        <Lightbox
          index={index}
          plugins={[Inline]}
          slides={images}
          on={{
            view: updateIndex,
            click: () => setIsOpen(true),
          }}
          inline={{
            style: {
              ...inlineStyles,
            },
          }}
          carousel={carousel}
        />
  
        <Lightbox
          open={open}
          close={() => setIsOpen(false)}
          index={index}
          slides={images}
          on={{ view: updateIndex }}
          animation={{ fade: 0 }}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        />
      </>
    )
  }
  export default Gallery