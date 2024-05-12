/* eslint-disable prettier/prettier */
import * as ms_data from "../../scraping/data/FSE/MS.json";
import * as csce_data from "../../scraping/data/FSE/CSCE.json";
import * as bio_data from "../../scraping/data/ASE/Bioscience.json";
import * as chem_data from "../../scraping/data/ASE/Chemistry.json";
import * as physic_data from "../../scraping/data/ASE/Physics.json";
import * as ce_data from "../../scraping/data/CSE/CE.json";
import * as me_data from "../../scraping/data/CSE/ME.json";

export const lab_combiner = {
  CSCE: csce_data,
  MS: ms_data,
  BIOS: bio_data,
  CHEM: chem_data,
  PHY: physic_data,
  CE: ce_data,
  ME: me_data,
};
