import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Table } from 'react-bootstrap';

const API = axios.create({ baseURL: '/.netlify/functions/withExpress' })

export default function App() {
  const [links, setLinks] = useState([])
  const [refresh, setRefresh] = useState(false)
  const loadLinks = async () => {
    try {
      const { data } = await API.get('/get')
      // console.log(data)
      setLinks(data)
    }
    catch (err) {
      // console.log(err)
    }
  }

  useEffect(() => {
    loadLinks()
  }, [refresh])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row', padding: '50px', alignItems: 'center' }}>
      <div>
        <h2>Add link</h2>
        <CreateLink toggleRefresh={() => setRefresh(p => !p)} />
      </div>
      <div>
        <LinkList toggleRefresh={() => setRefresh(p => !p)} links={links} />
      </div>
    </div>
  );
}





const initial = { name: '', url: '', description: '' }

function CreateLink({ toggleRefresh }) {
  const [link, setLink] = useState(initial)
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setLink(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(link).find(t => !t)==='' || loading) return null
    
    setLoading(true)
    try {
      await API.post('/create', link)
      setLink(initial)
      setLoading(false)
      toggleRefresh()
    } catch (error) {
      setLoading(false)
      // console.log(error);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Link name</Form.Label>
        <Form.Control name='name' onChange={handleChange} value={link.name} type="text" placeholder="Enter name" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Url</Form.Label>
        <Form.Control name='url' onChange={handleChange} value={link.url} type="text" placeholder="Enter url" />
      </Form.Group>
      <Form.Group controlId="formBasicPasswutyiord">
        <Form.Label>Description</Form.Label>
        <Form.Control name='description' type="text" as='textarea' onChange={handleChange} value={link.description} placeholder="Enter description" />
      </Form.Group>
      <Button variant="primary" type="submit" style={{ minWidth: '100px', height: '40px', alignItems: 'center', justifyContent: 'center' }}>
        {
          loading ?
            <Spinner animation="border" variant='light' size='sm' /> :
            'Add Link!'
        }
      </Button>
    </Form>
  )
}

const Thead = (<thead>
  <tr>
    <th>Link</th>
    <th>Url</th>
    <th>Description</th>
    <th>Ations</th>
  </tr>
</thead>)

function LinkList({ links, toggleRefresh }) {
  return (
    <div>
      <h2>Links</h2>
      <Table striped bordered hover>
        {Thead}
        <tbody>
          {links && links.map(link => (
            !link.archived && <LinkCard toggleRefresh={toggleRefresh} key={link._id} link={link} />
          ))}
        </tbody>
      </Table>
      <h2>Archived</h2>
      <Table striped bordered hover>
        {Thead}
        <tbody>
          {links && links.map(link => (
            link.archived && <LinkCard toggleRefresh={toggleRefresh} key={link._id} link={link} />
          ))}
        </tbody>
      </Table>
    </div>
  )
}

function LinkCard({ link = {}, toggleRefresh }) {
  const [loading, setLoading] = useState('')

  const { url, name, description, archived, _id } = link

  const archiveLink = async () => {
    link.archived = !archived
    try {
      setLoading('success')
      await API.patch('/update', link)
      toggleRefresh()
    } catch (error) {
      setLoading('')
    }
  }

  const deleteLink = async () => {
    try {
      setLoading('danger')
      await API.delete(`/delete/${_id}`)
      setLoading('')
      toggleRefresh()
    } catch (error) {
      setLoading('')
    }
  }

  return (
    <tr>
      <td>{name}</td>
      <td><a href={url}>{url}</a></td>
      <td>{description}</td>
      <td style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '90px', width: '90px' }}>
        {
          Boolean(loading) ?
            <Spinner animation="border" variant={loading} /> :
            <>
              <Button variant='success' size='sm' onClick={archiveLink}>{archived ? 'unArchive' : 'Archive'}</Button>
              <Button variant='danger' size='sm' onClick={deleteLink}>delete</Button>
            </>
        }
      </td>
    </tr>
  )
}




