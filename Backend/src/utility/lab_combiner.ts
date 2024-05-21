/* eslint-disable prettier/prettier */
import * as ms_data from "../../scraping/data/labs/FSE/MS.json";
import * as csce_data from "../../scraping/data/labs/FSE/CSCE.json";
import * as bio_data from "../../scraping/data/labs/ASE/Bioscience.json";
import * as chem_data from "../../scraping/data/labs/ASE/Chemistry.json";
import * as physic_data from "../../scraping/data/labs/ASE/Physics.json";
import * as ce_data from "../../scraping/data/labs/CSE/CE.json";
import * as me_data from "../../scraping/data/labs/CSE/ME.json";

export const lab_combiner = {
  CSCE: csce_data,
  MS: ms_data,
  BIOS: bio_data,
  CHEM: chem_data,
  PHY: physic_data,
  CE: ce_data,
  ME: me_data,
};
