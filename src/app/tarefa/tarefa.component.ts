import { Component } from '@angular/core';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css'],
})
export class TarefaComponent {
  ListaTarefas: any[] = [];
  TAREFA_KEY = 'tarefa_key';

  ngOnInit(): void {
    const tarefas = localStorage.getItem(this.TAREFA_KEY);

    if (tarefas) {
      this.ListaTarefas = JSON.parse(tarefas);
    }
  }

  adicionar(nomeTarefa: string) {
    if (nomeTarefa.trim().length === 0) return;

    const tarefaEncontrada = this.ListaTarefas.find(
      (item) => item.nome.toLowerCase() === nomeTarefa.toLowerCase()
    );
    if (!tarefaEncontrada) {
      this.ListaTarefas.push({
        id: this.ListaTarefas.length,
        nome: nomeTarefa,
        status: false,
      });
      this.salvarLista();
    }
  }

  deletar(tarefa: number) {
    this.ListaTarefas = this.ListaTarefas.filter((item) => item.id !== tarefa);
    this.salvarLista();
  }

  concluida(tarefa: number) {
    let tarefaAtual = this.ListaTarefas.find((item) => item.id === tarefa);

    if (tarefaAtual) {
      tarefaAtual.status = !tarefaAtual.status;
      this.salvarLista();
    }
  }

  private salvarLista() {
    localStorage.setItem(this.TAREFA_KEY, JSON.stringify(this.ListaTarefas));
  }
}
