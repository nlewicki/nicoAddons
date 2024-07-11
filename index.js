import "./vgp";
import Settings from "./Settings";

import "./Features/Auto4";
import "./Features/autoss";
import "./Features/AutoRefillEnderPearls";

register("command", () => Settings.openGUI()).setName("na");
register("command", Settings.openGUI).setName("simonshutup").setAliases("autoss");
