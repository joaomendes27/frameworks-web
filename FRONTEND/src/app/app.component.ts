import { Component } from '@angular/core';
import { Tarefa } from './tarefa';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TODOapp';
  arrayDeTarefas: Tarefa[] = [];

  apiURL: string;
  usuarioLogado = false;
  tokenJWT = '';

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000'; // ou a URL do seu backend
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa, this.getAuthHeaders()).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      }
    );
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    const indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    const id = this.arrayDeTarefas[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`, this.getAuthHeaders()).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      }
    );
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, this.getAuthHeaders()).subscribe(
      resultado => {
        this.arrayDeTarefas = resultado;
        this.usuarioLogado = true;
      },
      erro => {
        console.error('Erro ao ler tarefas:', erro);
        this.usuarioLogado = false;
      }
    );
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    const indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    const id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada, this.getAuthHeaders()).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      }
    );
  }

  login(username: string, password: string) {
    const credenciais = { nome: username, senha: password };
    this.http.post<any>(`${this.apiURL}/api/login`, credenciais).subscribe(
      resultado => {
        this.tokenJWT = resultado.token;
        this.usuarioLogado = true;
        this.READ_tarefas();
      },
      erro => {
        console.error('Erro no login:', erro);
        alert('Usuário ou senha inválidos');
      }
    );
  }

  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        'id-token': this.tokenJWT
      })
    };
  }
}
