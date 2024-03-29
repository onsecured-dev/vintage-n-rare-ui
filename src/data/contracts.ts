// MAINNET
export const main_electricGuitars = "0xdaadb2ff6aec92662eb7c491db93d7ac432042b2"
export const main_acousticGuitars = "0x3bc7bda0c5A347cAa5C62030D2c3790F7b316386"
export const main_electricBass = "0x63667a529e26af2624104a664a93be7a2ab66675"
export const main_ampsEffects = "0xE7FA5865549106f8be7522b0eb51f59D032DDFbD"
// TESTNET
export const test_electricGuitars = "0x732f876EF9D2416EB509b5fe3C79c3925e227f68"
export const test_acousticGuitars = "0x77E32647E14A12f840a9614554D5DB44020Cf34E"
export const test_electricBass = "0x7333DA35Baca8e02dF4dbf8F7b18Bc789A2F1724"
export const test_ampsEffects = "0x971F2EC349D5ABB24db088fd1B19E22337258e26"
export const electricGuitars =  main_electricGuitars;
export const acousticGuitars =  main_acousticGuitars;
export const electricBass =  main_electricBass;
export const ampsEffects =  main_ampsEffects;

export const contractAddressMapping = {
   "electric-guitar" : electricGuitars,
   "acoustic-guitar" : acousticGuitars,
   "electric-bass" : electricBass,
   "amps-effects" : ampsEffects,
   "amps" : ampsEffects
} as const
