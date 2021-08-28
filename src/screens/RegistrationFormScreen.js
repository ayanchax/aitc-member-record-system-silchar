import React, { useRef, useState } from 'react'
import AddBoxIcon from '@material-ui/icons/AddBox';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom"
import { Helmet } from "react-helmet";
import db from '../firebase'
import { databaseMode } from '../firebase'
import firebase from 'firebase';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from '../Footer';
toast.configure();

function RegistrationFormScreen() {
    let history = useHistory();
    const nameRef = useRef(null);
    const evaluateTestDataBoolean = databaseMode === "test" ? true : false;
    const [requestProcessing, setRequestProcessing] = useState(false)
    const [gender, setGender] = useState('Male')
    const [_lac, setLac] = useState('0')
    const ageRef = useRef(0);
    const addressRef = useRef(null);
    const mobileRef = useRef(null);
    const [isNameErrored, setNameErrored] = useState(false)
    const [isAgeErrored, setAgeErrored] = useState(false)
    const [isAddressErrored, setAddressErrored] = useState(false)
    const [isLacErrored, setLacErrored] = useState(false)
    const [isMobileNumberErrored, setMobileNumberErrored] = useState(false)
    const [formHasValidationErrors, setFormValidationErrors] = useState(false)
    const reinitiliazeValidation = () => {
        setNameErrored(false)
        setAgeErrored(false)
        setAddressErrored(false)
        setLacErrored(false)
        setMobileNumberErrored(false)
        setFormValidationErrors(false)

    }
    const addMember = (e) => {
        e.preventDefault();
        setRequestProcessing(true)
        reinitiliazeValidation()
        let error = false;
        if (nameRef.current.value.trim() === '') {
            setNameErrored(true)
            error = true;
        }
        if (ageRef.current.value.trim() === '') {
            setAgeErrored(true)
            error = true;
        }
        if (isNaN(ageRef.current.value.trim())) {
            setAgeErrored(true)
            error = true;
        }
        if (Number(ageRef.current.value) < 18) {
            setAgeErrored(true)
            error = true;
        }
        if (addressRef.current.value.trim() === '') {
            setAddressErrored(true)
            error = true;
        }
        if (_lac === '0') {
            setLacErrored(true)
            error = true;
        }
        if (mobileRef.current.value.trim() === '') {
            setMobileNumberErrored(true)
            error = true;
        }
        if (isNaN(mobileRef.current.value.trim())) {
            setMobileNumberErrored(true)
            error = true;
        }
        if (mobileRef.current.value.trim().length < 10) {
            setMobileNumberErrored(true)
            error = true;
        }
        if (error) {
            setFormValidationErrors(true)
            toast.error('Please fill in the required fields correctly.', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
            setRequestProcessing(false)
            return;
        }

        const name = nameRef.current.value.trim();
        const age = ageRef.current.value.trim();
        const sex = gender;
        const address = addressRef.current.value.trim();
        const lac = _lac;
        const mobile = mobileRef.current.value.trim();

        // firebase
        db.collection("aitc-members").add({
            member_name: name,
            gender: sex,
            age: age,
            address: address,
            LAC: lac,
            mobile_number: mobile,
            created: firebase.firestore.FieldValue.serverTimestamp(),
            modified: null,
            signature: null,
            testdata: evaluateTestDataBoolean,
        }).then((response) => {
            resetForm()
            toast.dark('Member registered with AITC successfully', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
            setRequestProcessing(false)
        }).catch((error) => {
            toast.error('Failed to register member. Please try again.', {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 3000,
            });
            setRequestProcessing(false)
        })


    }
    const resetForm = () => {
        nameRef.current.value = null;
        ageRef.current.value = null;
        addressRef.current.value = null;
        mobileRef.current.value = null;
        setGender('Male')
        setLac('0')
        reinitiliazeValidation()
    }
    return (

        <div className="registrationFormScreen justify-center flex flex-col font-serif ">
            <Helmet>

                <title>AITC | Silchar | Registration</title>

            </Helmet>
            <div className="flex flex-col justify-center text-center mt-2 ">

                <img
                    className="w-42 block ml-auto mr-auto justify-center object-contain" src="resources/static/aitc-logo.PNG" alt="AITC-Logo" />

                <h3 className=" text-black-300 font-serif"><AddBoxIcon /> Member Registration</h3>
            </div>
            <hr />
            <div className={`mt-8 w-full justify-center px-20 ${requestProcessing && "opacity-50 pointer-events-none"} `}>
                <form>
                    <div className="grid grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Full Name</span>
                            <input ref={nameRef} type="text" className={`mt-0 block w-full px-0.5 border-0 border-b-2 ${isNameErrored && "border-red-500"} ${!isNameErrored && "border-gray-200"} focus:ring-0 focus:border-black`} placeholder="" />
                            {isNameErrored && (<span className="text-red-500 text-sm">Full Name is required.</span>)}
                        </label>
                        <label className="block">

                            <div className="flex space-x-2">
                                <input onChange={(e) => setGender('Male')} type="radio" id="male" name="gender" className="mt-1   focus:ring-0 focus:border-black" value="male"
                                    checked={gender === "Male"} />
                                <label for="male">Male</label>

                                <input onChange={(e) => setGender('Female')} type="radio" id="female" name="gender" className="mt-1    focus:ring-0 focus:border-black" value="female"
                                    checked={gender === "Female"} />
                                <label for="female">Female</label>
                            </div>

                        </label>
                        <label className="block">
                            <span className="text-gray-700">Age</span>
                            <input ref={ageRef} type="text" maxLength="2" className={`mt-0 block w-full px-0.5 border-0 border-b-2 ${isAgeErrored && "border-red-500"} ${!isAgeErrored && "border-gray-200"} focus:ring-0 focus:border-black`} />
                            {isAgeErrored && (<span className="text-red-500 text-sm">Candidate must be atleast 18 years of age. Only numbers allowed.</span>)}

                        </label>

                        <label className="block">
                            <span className="text-gray-700">Address</span>
                            <textarea ref={addressRef} className={`mt-0 block w-full px-0.5 border-0 border-b-2 ${isAddressErrored && "border-red-500"} ${!isAddressErrored && "border-gray-200"} focus:ring-0 focus:border-black`} rows="2"></textarea>
                            {isAddressErrored && (<span className="text-red-500 text-sm">Address is required.</span>)}

                        </label>

                        <label className="block">
                            <span className="text-gray-700">LAC</span>

                            <select value={_lac} onChange={(event) => setLac(event.target.value)} className={`mt-0   bg-white rounded  py-2 outline-none block w-full px-0.5 border-0 border-b-2 ${isLacErrored && "border-red-500"} ${!isLacErrored && "border-gray-200"}
                             focus:ring-0 focus:border-black`}>
                                <option value="0" className="py-1 text-gray-100">Select LAC</option>
                                <option value="Silchar" className="py-1">Silchar</option>
                                <option value="Sonai" className="py-1">Sonai</option>
                                <option value="Dhalai" className="py-1">Dhalai</option>
                                <option value="Udharbond" className="py-1">Udharbond</option>
                                <option value="Lakhipur" className="py-1">Lakhipur</option>
                                <option value="Barkhala" className="py-1">Barkhala</option>
                                <option value="Katigorah" className="py-1">Katigorah</option>
                            </select>
                            {isLacErrored && (<span className="text-red-500 text-sm">Please select a valid LAC.</span>)}

                        </label>
                        <label className="block">
                            <span className="text-gray-700">Mobile</span>
                            <input ref={mobileRef} type="text" maxLength="10" className={`mt-0 block w-full px-0.5 border-0 border-b-2 ${isMobileNumberErrored && "border-red-500"} ${!isMobileNumberErrored && "border-gray-200"} focus:ring-0 focus:border-black`} placeholder="" />
                            {isMobileNumberErrored && (<span className="text-red-500 text-sm">A 10 digit mobile number is required.</span>)}

                        </label>

                    </div>
                    <button onClick={(e) => addMember(e)} type="submit" className="  hidden">Button</button>
                </form>

            </div>
            <div className={`flex mt-3 justify-center text-center py-3 space-x-2 ${requestProcessing && "opacity-50 pointer-events-none"} `}>
                <Button onClick={(e) => addMember(e)} variant="contained" color="primary">
                    Add Member
                </Button>

                <Button onClick={(e) => resetForm()} variant="contained" color="secondary">
                    Cancel
                </Button>

                <Button onClick={(e) => history.push("/")} variant="contained" color="default">
                    Home
                </Button>
                <Button onClick={(e) => history.push("/silchar/aitc-members")} variant="contained" color="default">
                    View Members
                </Button>
            </div>

            <footer className=" relative  clear-both border-t-4 bg-white">
                <Footer testData={evaluateTestDataBoolean} testDataMessage="You are registering in test mode. This is not real data." />

            </footer>

        </div>
    )
}

export default RegistrationFormScreen
