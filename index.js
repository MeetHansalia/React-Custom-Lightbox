// Developed By Meet Hansalia

import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as utils from './LightBox';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_THRESHOLD = 300;
const INITIAL_X = 0;
const INITIAL_Y = 0;
const INITIAL_SCALE = 1;
const MOBILE_ICON_SIZE = 35;
const DESKTOP_ICON_SIZE = 50;

const ReactImageVideoLightbox = ({
    startIndex = 0,
    data = [],
    showResourceCount,
    onCloseCallback,
    onNavigationCallback,
    showThumbnails,
    enableAutoPlay,
    imageWidth,
    imageHeight,
    videoWidth,
    videoHeight,
    customCloseIcon, // Optional custom close icon
    customLeftArrowIcon,// Optional custom left arrow icon
    customRightArrowIcon,
    showCloseButton = true,
    bulletColor = "gray",
    activeBulletColor = 'white',
    showIndicators = true
}) => {
    const [state, setState] = useState({
        x: INITIAL_X,
        y: INITIAL_Y,
        scale: INITIAL_SCALE,
        index: startIndex,
        loading: true,
        iconSize: window.innerWidth <= 500 ? MOBILE_ICON_SIZE : DESKTOP_ICON_SIZE,
    });

    const width = window.innerWidth;
    const height = window.innerHeight;
    const videoRef = useRef(null);

    const handleThumbnailClick = (index) => {
        setState((prevState) => ({
            ...prevState,
            index,
            loading: true,
        }));
    };

    const swipeLeft = () => {
        if (state.index > 0) {
            setState((prevState) => ({
                ...prevState,
                index: prevState.index - 1,
                loading: true,
            }), () => onNavigationCallback(state.index - 1));
        }
    };

    const swipeRight = () => {
        if (state.index < data.length - 1) {
            setState((prevState) => ({
                ...prevState,
                index: prevState.index + 1,
                loading: true,
            }), () => onNavigationCallback(state.index + 1));
        }
    };


    const getResources = useCallback(() => {
        return data.map((resource, i) => {
            if (resource.type === 'photo') {
                return (
                    <div className='light-box-common-padding'>
                        <img
                            key={i}
                            alt={resource.altTag}
                            src={resource.url}
                            style={{
                                pointerEvents: state.scale === 1 ? 'auto' : 'none',
                                maxWidth: imageWidth,
                                maxHeight: imageHeight,
                                transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})`,
                                transition: 'transform 0.5s ease-out'
                            }}
                            onLoad={() => setState((prevState) => ({ ...prevState, loading: false }))}
                        />
                    </div>
                );
            }
            if (resource.type === 'video') {
                return (
                    <div className='light-box-common-padding diff-height-video'>
                        <video
                            key={i}
                            ref={state.index === i ? videoRef : null} // Assign ref to the current video
                            width={videoWidth}
                            height={videoHeight}
                            src={resource.url}
                            controls
                            autoPlay={enableAutoPlay}
                            style={{
                                pointerEvents: state.scale === 1 ? 'auto' : 'none',
                                transform: `translate(${state.x}px, ${state.y}px)`,
                                transition: 'transform 0.5s ease-out',
                                zIndex: 1
                            }}
                            onLoad={() => setState((prevState) => ({ ...prevState, loading: false }))}
                        />
                    </div>
                );
            }
            return null;
        });
    }, [data, state.x, state.y, state.scale, state.index]);


    // Close lightbox with Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            if (videoRef.current) {
                videoRef.current.pause(); // Pause the video
            }
            onCloseCallback();
        }
    };

    const handleClose = () => {
        if (videoRef.current) {
            videoRef.current.pause(); // Pause the video
        }
        onCloseCallback();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);


    const resources = getResources();

    return (
        <div
            style={{
                top: '0px',
                left: '0px',
                overflow: 'hidden',
                position: 'fixed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,1)',
                zIndex: 999
            }}>
            {showResourceCount && (
                <div
                    style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px',
                        padding: '15px',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                    <span>{state.index + 1}</span> / <span>{data.length}</span>
                </div>
            )}

            {/* Close Button */}
            {showCloseButton && (
                <div
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: `${state.iconSize * 0.8}px`,
                        zIndex: 2
                    }}
                    onClick={handleClose}>
                    {customCloseIcon ? customCloseIcon : (
                        <svg xmlns='http://www.w3.org/2000/svg' height='36px' viewBox='0 0 24 24' width='36px' fill='#FFFFFF'>
                            <path d='M0 0h24v24H0z' fill='none' />
                            <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
                        </svg>
                    )}
                </div>
            )}

            {/* Navigation Arrows */}
            {state.index > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        left: '10px',
                        zIndex: 1,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: `${state.iconSize}px`
                    }}
                    onClick={swipeLeft}>
                    {customLeftArrowIcon ? customLeftArrowIcon : (
                        <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 0 24 24' width='48px' fill='#FFFFFF'>
                            <path d='M0 0h24v24H0z' fill='none' />
                            <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' />
                        </svg>
                    )}
                </div>
            )}

            {state.index < data.length - 1 && (
                <div
                    style={{
                        position: 'absolute',
                        right: '10px',
                        zIndex: 1,
                        color: '#FFFFFF',
                        cursor: 'pointer',
                        fontSize: `${state.iconSize}px`
                    }}
                    onClick={swipeRight}>
                    {customRightArrowIcon ? customRightArrowIcon : (
                        <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 0 24 24' width='48px' fill='#FFFFFF'>
                            <path d='M0 0h24v24H0z' fill='none' />
                            <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' />
                        </svg>
                    )}
                </div>
            )}

            {/* Main Content */}
            {resources[state.index]}

            {/* Show Thumbnails */}
            {showIndicators && showThumbnails && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        display: 'flex',
                        gap: '10px',
                        overflowX: 'auto',
                        padding: '10px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        borderRadius: '10px',
                        zIndex: 9999
                    }}>
                    {data.map((resource, i) => (
                        <div
                            key={i}
                            style={{
                                cursor: 'pointer',
                                border: state.index === i ? '1px solid white' : '0.7px solid gray',
                                borderRadius: '5px',
                                padding: '2px',
                                width: '60px',
                                height: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            onClick={() => handleThumbnailClick(i)}>
                            {resource.type === 'photo' ? (
                                <img
                                    src={resource.url}
                                    alt={resource.altTag}
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <video
                                    width='100%'
                                    height='100%'
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    src={resource.url}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Hidden Thumbnails */}
            {showIndicators && !showThumbnails && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        paddingBottom: '10px',
                    }}
                >
                    {data.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setState((prevState) => ({ ...prevState, index: i, loading: true }))}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: state.index === i ? activeBulletColor : bulletColor,
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            )}

            {state.loading && (
                <div style={{ margin: 'auto', position: 'fixed' }}>
                    <style>
                        {`@keyframes react_image_video_spinner {
                0% {
                  transform: translate3d(-50 %, -50 %, 0) rotate(0deg);
                }
                100% {
                  transform: translate3d(-50%, -50%, 0) rotate(360deg);
                }
              }`}
                    </style>
                    <div
                        style={{
                            animation: '1.0s linear infinite react_image_video_spinner',
                            border: 'solid 5px #ffffff',
                            borderBottomColor: '#cfd0d1',
                            borderRadius: '50%',
                            height: 30,
                            width: 30,
                            position: 'fixed',
                            transform: 'translate3d(-50%, -50%, 0)'
                        }}></div>
                </div>
            )}
        </div>
    );
};



module.exports = { ReactImageVideoLightbox };