import React, {useEffect, useState} from 'react';
import { ApiClient } from './services/httpClient';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const apiClient = new ApiClient();
  const [backendData, setBackendData] = useState<ITask[]>([]);
  const [task, setTask] = useState<string>('');
  const [editTask, setEditTask] = useState<string>('');

  interface ITask {
    id : number;
    check: boolean;
    name: string;
  }

  //* Get tasks from the backend
  useEffect(() => getTasks(), []);

  function getTasks() {
    apiClient.getTasks('/tasks', {})
      .then((res) => res.data)
      .then(data => {
        setBackendData(data);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Erro',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

  //* Add a new task
  const handleSubmit = async(e : any) => {
    const objTask: ITask = { id: -1, check:false, name: task };
    e.preventDefault();
    if (!task.trim()) {
      Swal.fire({
        title: 'Erro',
        text: 'Campo em branco',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    await apiClient.postTasks("/tasks", objTask)
      .catch((err) => {
        Swal.fire({
          title: 'Erro',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      })
      .then(() => {
        e.target.parentElement.parentElement.children[2].children[0].value = '';
        Swal.fire({
          title: 'Sucesso',
          text: 'Tarefa adicionada com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .finally(() => getTasks());   
  }

  //* Edit a task
  const handleEdit = async(e : any) => {
    e.preventDefault();

    let id = e.target.parentElement.parentElement.children[0].children[0].value;
    let stringhId = String(id);
    let check = e.target.parentElement.parentElement.children[1].children[0].checked;
    let url = "/tasks/"+stringhId;  

    if (!editTask.trim()) {
      setEditTask(e.target.parentElement.parentElement.children[2].children[0].defaultValue);
      return;
    }
    const objEditTask: ITask = { id: id, check: check, name: editTask };
    await apiClient.putTasks(url, objEditTask)
    .catch((err) => {
      Swal.fire({
        title: 'Erro',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    })
    .then(() => {
      Swal.fire({
        title: 'Sucesso',
        text: 'Tarefa editada com sucesso',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    })
    .finally(() => getTasks());   
  }

  //* Delete a task
  const handleDelete = async(e : any) => {
    e.preventDefault();

    let id = e.target.parentElement.parentElement.children[0].children[0].value;
    let stringhId = String(id);

    await Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.deleteTasks("/tasks/"+stringhId, {id: id})
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        })
        .then(() => getTasks());
        Swal.fire(
          'Deletado!',
          'Sua tarefa foi deletada.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Sua tarefa está segura :)',
          'error'
        )
      }
    });

  }

//*-------------------------------------------------------------------------------------------------------------------------*//
  return (
    <div className="App">
      <div className='row'>
        <div className='col-lg-12'>
          <div className='table'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th className='id'>ID</th>
                  <th className='checkBox'>Concluido</th>
                  <th>Tarefa</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="text" value={0} disabled className='form-control' placeholder='id'/>
                  </td>
                  <td>
                    <input type="hidden" disabled/>
                  </td>
                  <td>
                    <input onChange={(e) => setTask(e.target.value)} type='text' className='form-control' placeholder='Adicione a Tarefa' />
                  </td>
                  
                  <td>
                    <button onClick={handleSubmit} className='btn btn-primary'>Adicionar</button>
                  </td>
                </tr>
                  {typeof backendData === 'undefined' ? 'Loading...' : (
                    backendData.map((task: ITask) => (
                        <tr key={task.id}>
                          <td className='id'>
                            <input type="text" disabled className='form-control' id='id' value={task.id}/>
                          </td>
                          <td className='checkBox'>
                            <input type="checkbox" className='form-check-input' defaultChecked={task.check}/>
                          </td>
                          <td>
                            <input onChange={(e) => setEditTask(e.target.value)} type="text" className='form-control' defaultValue={task.name}/>
                          </td>
                          <td>
                            <button onClick={handleEdit} className='btn btn-success'>Salvar</button>
                            <button onClick={handleDelete} className='btn btn-danger'>Deletar</button>
                          </td>
                        </tr>
                      )
                    ))
                  }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
