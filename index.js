import "./vgp";
import Settings from "./Settings";

import "./Features/Auto4";
import "./Features/autoss";
import "./Features/AutoRefillEnderPearls";
import "./Features/NewF7Titles";
import "./Features/BloodDialougeSkip";
import "./Features/ShortSkyBlockCommands";
import "./Features/ReaperSwap";
import "./helper";

register("command", () => Settings.openGUI()).setName("na");
