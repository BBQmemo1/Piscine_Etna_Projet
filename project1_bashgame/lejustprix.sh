#!/bin/bash

alea=$(( RANDOM % 50 +1 ))
tentative=15


for (( i=1 ; i <= $tentative ; i++ )) ; do
    read -p "coup $i : " guess
#si la commande est vide  > echo
    if [[ -z "$guess" ]]; then
        echo "entrer des chiffres"
#si la command est en lettre > echo
    elif [[ "$guess" =~ [a-zA-Z] ]]; then
        echo "des chiffres pas des lettres"
#le nombre de tentative max
    elif [ $i -ge $tentative ] ; then
        echo "tentative depasser"
        exit
#le resultat correspond au commande reussi 
    elif [ $guess -eq $alea ] ; then
        echo "Félicitation ! vous avez trouver le juste prix *$alea* en $i coups"
        exit
# la commande est trop haut de la valeur
    elif [ "$guess" -gt "$alea" ]; then
        echo "Trop haut !"
# la commande est trop bas de la valeur
    elif [ "$guess" -lt "$alea" ]; then
        echo "Trop bas !"
    fi 
done



