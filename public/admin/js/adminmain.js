function getSizeObjectFromSizeAndMeasurementUnit(size, MeasurementUnit) {
    var SizeSqft = 0;
    var SizeMarla = 0;
    var SizeKanal = 0;
    var SizeAcre = 0;

    if (MeasurementUnit == "Sqft") {
        SizeSqft = size;
        SizeMarla = size / 225;
        SizeKanal = size / 4500;
        SizeAcre = size / (4500*8);
    }  else if (MeasurementUnit == "Marla") {
        SizeSqft = size * 225;
        SizeMarla = size;
        SizeKanal = size / 20;
        SizeAcre = size / (20 * 8);
    } else if (MeasurementUnit == "Kanal") {
        SizeSqft = size * 4500;
        SizeMarla = size * 20;
        SizeKanal = size;
        SizeAcre = size  / 8;
    }
    else if (MeasurementUnit == "Acre") {
        SizeSqft = size * 8 * 20 * 225;
        SizeMarla = size * 8 * 20;
        SizeKanal = size * 8;
        SizeAcre = size;
    }

        return  { sizeSqft: Math.round(SizeSqft * 100) / 100,  sizeMarla: Math.round(SizeMarla * 100) / 100, sizeKanal: Math.round(SizeKanal * 100) / 100 ,sizeAcre: Math.round(SizeAcre * 100) / 100,} ;
    
}