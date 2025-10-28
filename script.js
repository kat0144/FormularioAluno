//classe pessoa
class Aluno {
    constructor(nome, idade, curso, notaFinal) {
        this.nome = nome;
        this.idade = idade;
        this.curso = curso;
        this.notaFinal = notaFinal;
    }
}

console.log('Funcionando!');

class AlunoController {
    constructor() {
        this.alunos = []; //inicializa um array vazio para armazenar alunos 
        this.init();
    }

    //adiciona evento no button para cadastrar - arrow function
    init(){
        document.getElementById('btnCadastrar').addEventListener('click', (e) => this.cadastrarAluno(e));
        document.getElementById('btnExcluir').addEventListener('click', (e) => this.excluirAluno(e));
        document.getElementById('btnEditar').addEventListener('click', (e) => this.editarAluno(e));
    }   


    //cadastra um aluno na lista 
    cadastrarAluno(e){
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const curso = document.getElementById('curso').value;
        const notaFinal = document.getElementById('notaFinal').value;


        const aluno = new Aluno(nome, idade, curso, notaFinal);

        this.alunos.push(aluno); //pega as info e imprime na tabela 
        this.atualizarTabela(); // atualiza a tabela com nova lista de alunos
        this.limparFormulario(); // limpa os campos de formulário
    }

    editarAluno(event){
        const row = event.target.closest('tr'); //obtém a linha da tabela onde o botão foi clicado
        const index = row.rowIndex - 1;
        const aluno = this. alunos[index];

        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('curso').value = aluno.curso;
        document.getElementById('notaFinal').value = aluno.notaFinal;

        
        this.alunos.splice(index, 1); //remove aluno da lista
        this.atualizarTabela(); // atualiza a tabela com a nova lista de alunos
    }

    excluirAluno(e) {
        e.preventDefault();
        const row = e.target.closest('tr'); 
        const index = row.rowIndex - 1;

        this.alunos.splice(index, 1);
        this.atualizarTabela();

    }

    atualizarTabela(){
        const tabela = document.getElementById('tabela');
        tabela.innerHTML = '';
        this.alunos.forEach((aluno, index) => { //repete a linha de cada aluno no seu indice 
            const row = tabela.insertRow();
            row.insertCell(0).innerText = index + 1;
            row.insertCell(1).innerText = aluno.nome;
            row.insertCell(2).innerText = aluno.idade;
            row.insertCell(3).innerText = aluno.curso;
            row.insertCell(4).innerText = aluno.notaFinal;

            const btnEditar = document.createElement('button');
            btnEditar.innerText = 'Editar';
            btnEditar.type = 'button'

            const btnExcluir = document.createElement('button');
            btnExcluir.innerText = 'Excluir';
            btnExcluir.type = 'button'

            //cria uma célula para os botões 
            const actionCell = row.insertCell(5);

            //adiciona o botão de editar e excluir na célula
            actionCell.appendChild(btnEditar); 
            actionCell.appendChild(btnExcluir);
            actionCell.style.display = 'flex';
            actionCell.style.gap = '5px';


            btnEditar.addEventListener('click', (event) => this.editarAluno(event));
            btnExcluir.addEventListener('click', (event) => this.excluirAluno(event));
        
        });

    }

    limparFormulario(){
        document.getElementById('nome').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('curso').value = '';
        document.getElementById('notaFinal').value = '';
    
    
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new AlunoController();
});