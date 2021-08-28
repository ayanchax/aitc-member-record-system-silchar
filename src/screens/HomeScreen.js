import React from 'react'
import Banner from '../Banner'
import "./HomeScreen.css"
import { Helmet } from "react-helmet";
import RegistrationFormScreen from './RegistrationFormScreen'
import Footer from '../Footer';
import { databaseMode } from '../firebase'

function HomeScreen() {
    const evaluateTestDataBoolean = databaseMode === "test" ? true : false;
    return (
        <div className="">
            <Helmet>

                <title>All India Trinamool Congress | Silchar</title>

            </Helmet>
            <Banner />
            <footer className=" relative  mt-72 clear-both border-t-4 bg-white">
                <Footer testData={evaluateTestDataBoolean} message="Powered by Google Firebase. To know more contact support." />

            </footer>


        </div>
    )
}
//
export default HomeScreen
