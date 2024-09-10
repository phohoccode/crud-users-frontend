import { useState, useEffect } from 'react'
import axios from 'axios';

import Posts from '../components/Posts';

function Home() {


    return (
        <div className="container mt-5">
            <Posts />
        </div>
    );
}

export default Home;