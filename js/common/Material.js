var Material = function(diffuse, specular, specExponent, hasNormalMap)
{
    return {
        diffuse: diffuse,
        specular: specular,    
        specExponent : specExponent,
        hasNormalMap : hasNormalMap,
    }
}