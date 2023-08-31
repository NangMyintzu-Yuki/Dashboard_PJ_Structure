import React, {useState,useEffect} from 'react'
import ListPage from './../../components/common/ListPage';
import { useNavigate } from 'react-router-dom';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import { showErrorToast, showSuccessToast, DeleteRow, showError } from './../../utils/commonFun';
import Loading from './../../components/common/Loading';
import Button from './../../components/common/Button';
import { FaEdit,FaTrash } from 'react-icons/fa';
import Spinner from './../../components/common/Spinner';


function BranchList() {
  const [branches,setBranches] = useState([])
  const [loading,setLoading] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [page,setPage] = useState(1)
  const [currentRowsPerPage, setCurrentRowsPerPage] = useState(10)

  const navigate = useNavigate();
  const handleCreate = () =>{
    navigate('/branch/create')
  }
  const token = localStorage.getItem('operator_token')
  useEffect(()=>{

    const getBranchList = async () =>{
      try{
        setLoading(true);
        const {data,pagination} = await post(ApiService.branch.list, {},token)
        if(data.status == 'Success'){
          setBranches(data.data.data)
          setLoading(false)
        }
      }catch(error){
        showErrorToast(error.message)
      }
    }
    getBranchList();
  },[page])
  const handleEdit = (row) =>{
    navigate(`${row.id}/edit`)
  }
  const handleDelete = async(row) =>{
    setSpinner(true)
    try {
      const { data } = await post(ApiService.branch.delete, { id: row.id });
      if (data.code === 200) {
        setSpinner(false)
        showSuccessToast(data.message)
        setBranches(DeleteRow(branches, row.id));
      } else {
        showError(data)
        setSpinner(false)
      }
    } catch (err) {
      setSpinner(false)
      showErrorToast(err.message)
    }
  }

  const columns = [
    {
      field: 'id', 
      headerName: 'No', 
      width: 80,
      // renderCell: (params) => {
      //   console.log(params)
      //   // return params.id
      //   return (((page * currentRowsPerPage) - currentRowsPerPage));
      // }
    },
    { 
      field: 'name', 
      headerName: 'Name', 
      width: 200,
      sortable:true,
      valueGetter: (params) =>  `${params.row.name || ''}`
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      sortable: false,
      hideable: false,
      filterable:false,
      managable:false,
      renderCell: (params) => {
        return (
          <div>
            <FaEdit size="20px" fill="var(--primary-color)" onClick={()=>handleEdit(params.row)}/> &nbsp;&nbsp;&nbsp;
            <FaTrash size="18px" fill="red" onClick={()=>handleDelete(params.row)}/>
          </div>
        )
      }, 
    }
  ];

  return (
    <div>
    {
      loading && <Loading/>
    }
    {
      spinner && <Spinner/>
    }
      <ListPage 
        rows={branches}
        columns={columns}
        header={"Branch List"}
        onAction={handleCreate}
        currentRowsPerPage={currentRowsPerPage}
      />
    </div>
  )
}

export default BranchList
