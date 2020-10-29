import React from 'react';

import banner from '../../assets/img/banner.jpg';

const Banner = () => {
    return (
        <div>
            <section className="banner_sec">
                <img src={banner} alt=""/>

                <div className="banner_text">
                    <h2>SMART EDUCATION ASSESSMENT CENTRE</h2>
                </div>
                
            </section>
        </div>
    );
}

export default Banner;