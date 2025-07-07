import { ConnectFour } from "./connect-4-plugin/conn_four.js";

let $play = new ConnectFour(7, 6, "red", "yellow");
$play.setBoard($play.getColumns(), $play.getRows());
