const express = require('express');
const logRequest = require('./middleware/index')
const { uuid } = require('uuidv4')

const app = express();
app.use(express.json());


const projects = [];

app.use(logRequest)

app.get('/projects', (request, response) => {
  const { title } = request.query;
  const results = title
  ? projects.filter(project => project.title.includes(title))
  : projects;

  return response.json(results);
});
//CRIAR DADOS ROTA
app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);
  console.log(project)
  
  return response.json(project);
});
//ATUALIZAR ROTA
app.put('/projects/:id',logRequest, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;


  const projectIndex = projects.findIndex(project => project.id === id)
  if (projectIndex < 0) {
    return response.status(400).json({ error: 'project not found.' })
  }
  const project = {
    id,
    title,
    owner,
  };
  projects[projectIndex] = project

  console.log(id)
  return response.json(project);
});
//DELETE ROTA
app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;  
    
    const projectIndex = projects.findIndex(project => project.id === id)
    if (projectIndex < 0) {
      return response.status(400).json({ error: 'project not found.' })
    }

    projects.splice(projectIndex, 1);

  return response.status(204).send();
});



app.listen(3333, () => {
  console.log('Backend started!')
});
