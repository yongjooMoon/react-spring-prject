import React from 'react';
import filledHeart from '../assets/heart-filled.png'; // 채워진 하트 이미지 경로
import outlineHeart from '../assets/heart-outline.png'; // 비어있는 하트 이미지 경로

const HeartButton = ({ isLiked, onHeartClick }) => {
    return (
        <button onClick={onHeartClick} style={styles.button}>
            <img 
                src={isLiked ? filledHeart : outlineHeart} 
                alt="heart" 
                style={styles.image}
            />
        </button>
    );
};

const styles = {
    button: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 10,
    },
    image: {
        width: '30px',
        height: '30px',
    }
};

export default HeartButton;
