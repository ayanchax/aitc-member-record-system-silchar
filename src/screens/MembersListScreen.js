import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Helmet } from "react-helmet";
import { databaseMode } from '../firebase'
import firebase from 'firebase';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PeopleIcon from '@material-ui/icons/People';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable, { MTableToolbar } from "material-table";
import MessageIcon from '@material-ui/icons/Message';
import Button from '@material-ui/core/Button';
import RefreshIcon from '@material-ui/icons/Refresh';
import Footer from '../Footer';

toast.configure();
function MembersListScreen() {
    let history = useHistory();
    const evaluateTestDataBoolean = databaseMode === "test" ? true : false;
    const [members, setMembers] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    useEffect(() => {

        async function getData() {
            await firebase.firestore().collection('aitc-members')
                .where('testdata', '==', evaluateTestDataBoolean).orderBy('created', 'desc')
                .get().then((_snapshot) => {
                    let _data = []
                    _snapshot.docs.map(doc => {
                        _data.push({
                            id: doc.id, ...doc.data()
                        })
                    });
                    setMembers(_data)
                }).catch((err) => {
                    toast.error('Error retrieveing members.', {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 3000,
                    });
                })
        }
        getData();
    }, []);
    useEffect(() => {
        firebase.firestore().collection('aitc-members').where('testdata', '==', evaluateTestDataBoolean)
        .orderBy('created', 'desc').onSnapshot((snapshot) => {
            let _data = []
            snapshot.docs.map(doc => {
                _data.push({
                    id: doc.id, ...doc.data()
                })
            });
            setMembers(_data);
        })

    }, [members]);


    return (
        <div>
            <Helmet>
                <title>AITC | Silchar | Members</title>
            </Helmet>
            <div className="flex flex-col justify-center text-center mt-2">
                <img
                    className="w-42 block ml-auto mr-auto justify-center object-contain" src="/resources/static/aitc-logo.PNG" alt="AITC-Logo" />
                <h3 className=" text-black-300 font-serif"><PeopleIcon /> AITC Silchar</h3>

            </div>
            <div className="flex mt-3 justify-center text-center py-3 space-x-2">
                <Button onClick={(e) => history.push("/")} variant="contained" color="primary">
                    Home
                </Button>
                <Button onClick={(e) => history.push("/registration")} variant="contained" color="secondary">
                    Add Member
                </Button>
                <div title="Refresh"  >
                    <RefreshIcon onClick={(e) => window.location.reload()} className=" cursor-pointer" />
                </div>
            </div>

            <div className="font-serif text-sm w-full">
                <MaterialTable className="font-sm border-2 "
                    icons={tableIcons}

                    columns={[
                        { title: "OID", field: "id", hidden: true },
                        { title: "Name", field: "member_name" },
                        { title: "Age", field: "age", type: "numeric" },
                        { title: "Gender", field: "gender" },
                        {
                            title: "Mobile#",
                            field: "mobile_number",
                            type: "numeric"
                        },
                        {
                            title: "Address",
                            field: "address",
                        },
                        {
                            title: "LAC",
                            field: "LAC",
                        },

                    ]}
                    data={
                        members
                    }
                    localization={{
                        body: {
                            emptyDataSourceMessage: "No records found.",
                        },
                    }}
                    options={{
                        headerStyle: {backgroundColor: 'grey', color: '#fff'},
                        pageSize: rowsPerPage,
                        pageSizeOptions: [5, 10, 20, { value: members.length, label: 'All' }],
                        exportButton: true,
                        search: true,
                        searchFieldAlignment: "right",
                        actionsColumnIndex: -1
                    }}
                    actions={[
                        {
                            icon: () => <Edit />,
                            tooltip: 'Edit User',
                            onClick: (event, rowData) => {
                                alert("You are trying to edit " + rowData.member_name + ". But this function is not enabled yet. Please contact developer.")
                            }
                        },
                        {
                            icon: () => <Remove />,
                            tooltip: 'Remove User',
                            onClick: (event, rowData) => {
                                alert("You are trying to remove " + rowData.member_name + ". But this function is not enabled yet. Please contact developer.")

                            }
                        },
                        {
                            icon: () => <MessageIcon />,
                            tooltip: 'Send Welcome SMS',
                            onClick: (event, rowData) => {
                                alert("You are trying to send a welcome message to " + rowData.member_name + " on " + rowData.mobile_number + ". But this function is not enabled yet. Please contact developer.")


                            }
                        },
                    ]}
                    title="List of Members"
                     
                />
            </div>
            <Footer testData={evaluateTestDataBoolean} testDataMessage="Showing Test Data" />


        </div>
    )
}

export default MembersListScreen
