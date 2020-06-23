import React from 'react';

import { Header } from '../components/header';
import { Banner } from '../components/banner';
import { Experiences } from "../components/experiences";

export default function HomePage() {

    return (
        <React.Fragment>
            <Header />
            <Banner />
            <Experiences />
        </React.Fragment>
    );
}
