import React from 'react';

function VideoItem({ video, height }) {
    if (!video) {
        return null;
    }
    
    // Función para extraer el ID del video de YouTube desde una URL normal de YouTube
    const getYouTubeID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        return (url.match(regex) ? url.match(regex)[1] : false);
    };

    // Detectar si es un enlace de YouTube
    const videoId = getYouTubeID(video.link);
    if (videoId) {
        // Renderizar el iframe para YouTube
        return (
            <div style={{ margin: 0, width: '100%' }}>
                <h3>{video.title}</h3>
                <iframe
                    title={`YouTube video player - ${video.title || 'Video'}`} // Agregar un título descriptivo
                    width="100%"
                    height={height === '100%' ? "500px" : height}
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                <p>{video.summary}</p>
            </div>
        );
    } else {
        // Renderizar el video como archivo directo
        return (
            <div style={{ margin: 10, width: '100%' }}>
                <video width="100%" height={height || "500px"} controls>
                    <source src={video.link} type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                </video>
            </div>
        );
    }
}

export default VideoItem;
