/*Aplicación de Administración de Biblioteca

Eres el desarrollador principal de una aplicación de administración de biblioteca. En un intento por hacer que la aplicación sea "fácil de usar",
 se ha agregado una gran cantidad de funcionalidad en una única clase, y se ha utilizado un único método para resolver diferentes tareas.

La clase LibraryManager no sólo se encarga de agregar o eliminar libros, sino que también gestiona los préstamos, las devoluciones y 
hasta la notificación por correo electrónico a los usuarios. Asimismo, se ha optado por usar un único método para realizar búsquedas, 
sin importar si es por título, autor o ISBN, complicando su implementación.

Se ha identificado que la clase es muy difícil de mantener y modificar. Tu tarea es estudiar el código, identificar los problemas y
considerar cómo podría refactorizarse para mejorar su diseño y estructura.*/
 
class EmailService{
    constructor(){

    }

    sendEmail(userID: string, message: string) {
        console.log(`Enviando email a ${userID}: ${message}`);
        // Implementación ficticia del envío de correo
    }
}

interface IObserver {
    update(userID: string): void;
}


class User implements IObserver{
    userID: string;

    constructor(){

    }

    update(userID: string): void {
        
    }
}

class Book {
    title: string;
    author: string;
    ISBN: string;
    constructor(title: string, author: string, ISBN: string){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }
}

class BookBuilder {
    private title: string = 'Unknown title';
    private author: string = 'Unknown Author';
    private ISBN: string = 'Unknown ISBN';

    constructor(title: string, author: string, ISBN: string){
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
    }   

    build(){
        return new Book(this.title, this.author, this.ISBN);
    }
}

class Loan {
    userID: string;
    ISBN: string;
    date: Date;

    constructor(user: User, book: Book, date: Date){
        this.userID = user.userID;
        this.ISBN = book.ISBN;
        this.date = date;
    }
}

class LibraryManagerEx {
    books: Book[] = [];
    loans: Loan[] = [];

    users: User[] = [];

    IEmailService = new EmailService;


    addBook(book: Book) {
        this.books.push(book);
    }

    removeBook(book: Book) {
        const index = this.books.findIndex(b => b.ISBN === book.ISBN);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    search(query: string) {
        // Usa el mismo método para buscar por título, autor o ISBN
        return this.books.filter(book => 
            book.title.includes(query) || 
            book.author.includes(query) || 
            book.ISBN === query
        );
    }

    loanBook(ISBN: string, userID: string) {
        const book = this.books.find(b => b.ISBN === ISBN);
        if (book) {
            this.loans.push({ ISBN, userID, date: new Date() });
            this.IEmailService.sendEmail(userID, `Has solicitado el libro ${book.title}`);
        }
    }

    returnBook(ISBN: string, userID: string) {
        const index = this.loans.findIndex(loan => loan.ISBN === ISBN && loan.userID === userID);
        if (index !== -1) {
            this.loans.splice(index, 1);
            this.IEmailService.sendEmail(userID, `Has devuelto el libro con ISBN ${ISBN}. ¡Gracias!`);
        }
    }
    
}

const libraryex = new LibraryManagerEx();

const libro1 = new BookBuilder('El Gran Gatsby', "F. Scott Fitzgerald", "123456789");
libraryex.addBook(libro1.build());
/*const libraryex = new LibraryManagerEx();
libraryex.addBook("El Gran Gatsby", "F. Scott Fitzgerald", "123456789");
libraryex.addBook("1984", "George Orwell", "987654321");
libraryex.loanBook("123456789", "user01");*/
