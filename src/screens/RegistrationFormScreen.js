import React from 'react'

import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom"
import { Helmet } from "react-helmet";
function RegistrationFormScreen() {
    let history = useHistory();
    return (

        <div className="registrationFormScreen justify-center flex flex-col font-serif">
            <Helmet>

                <title>AITC | Silchar | Registration</title>

            </Helmet>
            <div className="flex flex-col justify-center text-center mt-2">

                <img
                    className="w-42 block ml-auto mr-auto justify-center object-contain" src="resources/static/aitc-logo.PNG" alt="AITC-Logo" />

                <h3 className=" text-black-300 font-serif"><AddBoxIcon /> Member Registration</h3>
            </div>
            <hr />
            <div className="mt-8 w-full justify-center px-20">
                <div className="grid grid-cols-1 gap-6">
                    <label className="block">
                        <span className="text-gray-700">Full Name</span>
                        <input type="text" className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" placeholder="" />
                    </label>
                    <label className="block">

                        <div className="flex space-x-2">
                            <input type="radio" id="male" name="gender" className="mt-1   focus:ring-0 focus:border-black" value="male" checked />
                            <label for="male">Male</label>

                            <input type="radio" id="female" name="gender" className="mt-1    focus:ring-0 focus:border-black" value="female" />
                            <label for="female">Female</label>
                        </div>

                    </label>
                    <label className="block">
                        <span className="text-gray-700">Age</span>
                        <input type="text" maxlength="2" className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Address</span>
                        <textarea className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" rows="2"></textarea>
                    </label>

                    <label className="block">
                        <span className="text-gray-700">LAC</span>
                        <input type="text" className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" placeholder="" />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Mobile</span>
                        <input type="text" maxlength="10" className="mt-0 block w-full px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black" placeholder="" />
                    </label>

                </div>


            </div>
            <div className="flex mt-3 justify-center text-center py-3 space-x-2">
                <Button variant="contained" color="primary">
                    Add Member
                </Button>

                <Button variant="contained" color="secondary">
                    Cancel
                </Button>

                <Button onClick={(e) => history.push("/")} variant="contained" color="default">
                    Home
                </Button>


            </div>



        </div>
    )
}

export default RegistrationFormScreen
