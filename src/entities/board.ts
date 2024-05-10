export class Board {
    private board_ident: String;
    private created_at: Date;
    private board_name: String;

    constructor() {
        this.board_ident = "";
        this.created_at = new Date();
        this.board_name = "";
    }

    public setBoard(board_ident: String, created_at: Date, board_name: String) {
        this.board_ident = board_ident;
        this.created_at = created_at;
        this.board_name = board_name;
    }

    public getBoardIdent(): String {
        return this.board_ident;
    }

    public getBoardName(): String {
        return this.board_name;
    }

    public getBoardCreatedAt(): Date {
        return this.created_at;
    }
}