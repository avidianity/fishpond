import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from '@material-tailwind/react';
import React, { FC, Fragment, useState } from 'react';
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
    ImageWithZoom,
    DotGroup,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import 'pure-react-carousel/dist/react-carousel.cjs.css';

type Props = {
    pictures: string[];
};

const PicturesModal: FC<Props> = ({ pictures }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <Fragment>
            <Button
                onClick={(e) => {
                    e.preventDefault();
                    handleOpen();
                }}
                variant='gradient'
            >
                More Photos
            </Button>
            <Dialog open={open} handler={handleOpen} size='xl'>
                <DialogHeader>Photos</DialogHeader>
                <DialogBody divider className='pt-10'>
                    <div className='w-full md:w-[50%] lg:w-[35%] xl:w-[25%] mx-auto'>
                        <CarouselProvider
                            naturalSlideWidth={400}
                            naturalSlideHeight={500}
                            totalSlides={pictures.length}
                            hasMasterSpinner
                        >
                            <Slider>
                                {pictures.map((url, index) => (
                                    <Slide index={index} key={index}>
                                        <ImageWithZoom src={url} />
                                    </Slide>
                                ))}
                            </Slider>
                            <div className='flex mt-4'>
                                <ButtonBack>
                                    <Button variant='gradient' color='brown'>
                                        Back
                                    </Button>
                                </ButtonBack>
                                <ButtonNext className='ml-auto'>
                                    <Button variant='gradient' color='indigo'>
                                        Next
                                    </Button>
                                </ButtonNext>
                            </div>
                            <DotGroup />
                        </CarouselProvider>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant='text'
                        color='red'
                        onClick={(e) => {
                            e.preventDefault();
                            handleOpen();
                        }}
                        className='mr-1'
                    >
                        <span>Close</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </Fragment>
    );
};

export default PicturesModal;
