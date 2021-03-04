import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';


export default function App() {
  const [links, setLinks] = useState([])
  const [refresh, setRefresh] = useState(false)
  const loadLinks = async () => {
    try {
      const { data } = await axios.get('/api/getLinks')
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
        <h2>Add links</h2>
        <CreateLink toggleRefresh={() => setRefresh(p => !p)} />
      </div>
      <div>
        <h1>List O' Links</h1>
        <LinkList toggleRefresh={() => setRefresh(p => !p)} links={links} />
      </div>
    </div>
  );
}





const initial = { name: '', url: '', description: '' }

function CreateLink({ toggleRefresh }) {
  const [link, setLink] = useState(initial)

  const handleChange = ({ target: { name, value } }) => {
    setLink(p => ({ ...p, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      Object.values(link).forEach(data => {
        if (!data) return
      })
      await axios.post('/api/createLink', link)
      setLink(initial)
      toggleRefresh()
    } catch (error) {
      console.log(error);
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
      <Button variant="primary" type="submit">
        Add Links!
  </Button>
    </Form>
  )
}







function LinkList({ links, toggleRefresh }) {
  return (
    <div>
      <h2>Links</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Link</th>
            <th>Url</th>
            <th>Description</th>
            <th>Ations</th>
          </tr>
        </thead>
        <tbody>
          {links && links.map(link => (
            !link.archived && <LinkCard toggleRefresh={toggleRefresh} key={link._id} link={link} />
          ))}
        </tbody>
      </Table>
      <h2>Archived</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Link</th>
            <th>Url</th>
            <th>Description</th>
            <th>Ations</th>
          </tr>
        </thead>
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

  const { url, name, description, archived, _id } = link

  const archiveLink = async () => {
    link.archived = !archived
    try {
      await axios.put('/api/updateLink', link)
      // console.log('hai')
      toggleRefresh()
    } catch (error) {
      // console.log(error)
    }
  }

  const deleteLink = async () => {
    try {
      // console.log(_id)
      await axios.delete('/api/deleteLink', { data: { _id } })
      toggleRefresh()
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <tr>
      <td>{name}</td>
      <td><a href={url}>{url}</a></td>
      <td>{description}</td>
      <td style={{ display: 'flex', flexDirection: 'column' }}>
        <Button variant='success' size='sm' onClick={archiveLink}>{archived ? 'unArchive' : 'Archive'}</Button>
        <Button variant='danger' size='sm' onClick={deleteLink}>delete</Button>
      </td>
    </tr>
  )
}




