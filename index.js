import "./vgp";
import Settings from "./Settings";

import "./Features/Auto4";
import "./features/autoss";

register("command", () => Settings.openGUI()).setName("na");
register("command", Settings.openGUI).setName("simonshutup").setAliases("autoss");
