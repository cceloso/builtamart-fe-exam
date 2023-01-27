import { useEffect, useRef, useState } from 'react'

interface SlideshowProps {
    ids: any[]
    photos: any[]
    onHover: (index: number) => void
}

const Slideshow = (props: SlideshowProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const timer = useRef<ReturnType<typeof setInterval> | null>(null)
    
    const slideLeft = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? props.photos.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const moveToNextSlide = () => {
        const isLastSlide = currentIndex === props.photos.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const startSlideshow = () => {
        timer.current = setInterval(() => {
            moveToNextSlide()
            props.onHover(-1)
        }, 5000)
    }
    
    const stopSlideshow = () => {
        if (timer.current) {
            clearInterval(timer.current)
        }
    }
    
    const mouseEnterHandler = () => {
        props.onHover(currentIndex)
        stopSlideshow()
    }

    const mouseLeaveHandler = () => {
        props.onHover(-1)
        startSlideshow()
    }

    useEffect(() => {
        startSlideshow()
      
        return () => {
            stopSlideshow()
        }
    }, [currentIndex])

    return (
        <div className="h-[520px] w-full m-auto py-6 relative group">
            <div
                style={{backgroundImage: `url(${props.photos[currentIndex]})`}}
                className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
            ></div>
        </div>
    )
}

export default Slideshow