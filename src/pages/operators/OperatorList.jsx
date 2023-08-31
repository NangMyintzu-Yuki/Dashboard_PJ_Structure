import React, {useState,useEffect} from 'react'
import Loading from './../../components/common/Loading';
import ListPage from './../../components/common/ListPage';
import { ROW_CONUNT } from './../../utils/text';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { showErrorToast, showError, showSuccessToast, DeleteRow } from './../../utils/commonFun';
import { post } from './../../utils/api';
import { ApiService } from './../../data/apiList';
import Spinner from './../../components/common/Spinner';
const OperatorList = () => {
  const [loading,setLoading] = useState(false);
  const [spinner,setSpinner] = useState(false);
  const [operators, setOperators] = useState([])
  const [currentRowsPerPage,setCurrentRowsPerPage] = useState(ROW_CONUNT)
  const [page,setPage] = useState(1)
  const navigate = useNavigate();
  const token = localStorage.getItem('operator_token')

  useEffect(()=>{
    const getOperators = async() =>{
      setLoading(true);
      try {
        const { data, pagination} = await post(ApiService.operator.list, {}, token)
        if(data.status == "Success"){
          setOperators(data.data.data);
          setLoading(false)
        }else{
          showError(data)
        }
      } catch (error) {
          showErrorToast(error)
      }
    }
    getOperators();
  },[page])

  const columns = [
    {
      field: 'id',
      headerName: 'No',
      width: 80,
    },
    {
      field: 'branch',
      headerName: 'Branch',
      width: 200,
      sortable: true,
      valueGetter: (params) => `${params.row.branch.name || ''}`
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 200,
      sortable: true,
      valueGetter: (params) => `${params.row.name || ''}`
    },
    {
      field : 'username',
      headerName: 'Username',
      width: 200,
      sortable : true,
      valueGetter : (params) => `${params.row.username || params.row.name}`
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      sortable: false,
      hideable: false,
      filterable: false,
      managable: false,
      renderCell: (params) => {
        return (
          <div className="actionBtnIcon">
            <FaEdit size="20px" fill="var(--primary-color)" onClick={() => handleEdit(params.row)} /> &nbsp;&nbsp;&nbsp;
            <FaTrash size="18px" fill="red" onClick={() => handleDelete(params.row)} />
          </div>
        )
      },
    }
  ];
  const handleEdit = (row) =>{
    navigate(`/operator/${row.id}/edit`);
  }
  const handleCreate = () =>{
    navigate('/operator/create')
  }
  const handleDelete = async(row) =>{
    setSpinner(true)
    try {
      const { data } = await post(ApiService.operator.delete, { id: row.id });
      if (data.code === 200) {
        setSpinner(false)
        showSuccessToast(data.message)
        setOperators(DeleteRow(operators, row.id));
      } else {
        showError(data)
        setSpinner(false)
      }
    } catch (err) {
      setSpinner(false)
      showErrorToast(err.message)
    }
  }
  return (
    <div>
      {
        loading && <Loading />
      }
      {
        spinner && <Spinner />
      }
      
      <ListPage
        rows={operators}
        columns={columns}
        header={"Operators List"}
        onAction={handleCreate}
        currentRowsPerPage={currentRowsPerPage}
      />
    </div>
  )
}

export default OperatorList
