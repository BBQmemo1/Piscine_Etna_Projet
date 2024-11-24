#!/bin/bash
Ciblenumbre=$(( RANDOM % 100 +1 ))

unnumbre=$(( RANDOM % 20 +1 ))
deuxnumbre=$(( RANDOM % 20 +1 ))
troisnumbre=$(( RANDOM % 20 +1 ))
quatrenumbre=$(( RANDOM % 20 +1 ))
cinqnumbre=$(( RANDOM % 20 +1 ))
#lescinqnumbre=$( shuf -i 1-20 -n 5 )
nombres=($unnumbre $deuxnumbre $troisnumbre $quatrenumbre $cinqnumbre)
tentative=5 


for (( i=1 ; i<=$tentative ;i++ )); do 
    echo "coup $i : vos nombres : [${nombres[@]}]"
        read -p "entrez votre opération : " operation
        ((result=$operation))
        echo "resultat :$result"
# si op est divise  alors erreur sinon affiche result 

# recupere les elem 1 et elem2 sans l'operateur
    
#boucle du tableau qui pacours tous les nombres stocker
        for (( i=0; i<${#nombres[@]}; i++ )); do

#si elem1 = nombres[] && elem2 = nombre[] alors  sinon utilise les nombres donner
        
        done

    if [ $i -ge $tentative ]; then
        echo "tentative depasser"
        exit
    elif [ $result -eq $Ciblenumbre ]; then
        echo "Le compte est bon ! vous avez trouvé *$Ciblenumbre* en $i coups"
        exit
    fi

done
