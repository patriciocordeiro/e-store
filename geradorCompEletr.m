clear all;clc;
% format short g
% config
maxItens = 100;

%define values
capsValues = [1.2 1.3 1.5 1.6 1.8 2 2.2 2.4 2.7 3 3.3 3.6 3.9 4.3 4.7 5.1 5.6 6.2 6.8 7.5 8.2 9.1];
CapsScale = [1 10, 10e2, 10e3]; %Escala para obter outros valores de resistencia
CapsTol = [1 2 5 10 20]; %valores de tolerancia
CapsVolt= [16 25 50 100 600 1000 10 35 63 160 250 350 450 400 200];

resValues = [1.0 1.1 1.2 1.3 1.5 1.6 1.8 2.0 2.2 2.4 2.7 3.0 3.3 3.6 3.9 4.3 4.7 5.1 5.6 6.2 6.8 7.5 8.2 9.1];
resScale = [1 10, 10e2, 10e3, 10e4, 10e5, 1e06]; %Escala para obter outros valores de resistencia
resTolVal = [1 2 5 10 20]; %valores de tolerancia
% resTolIndex = randi(length(resTolVal),100,1); % index de resistencia
resPotVal = [2 1 1/2 1/4 1/8]; %Valores de pontecia
resImgPath ='../../assets/img/resistor/resistor.png';


for i=1:maxItens;
    refPM = randi(1000000); %Referencia da loja PM
    refFabricante =randi(1000000000); %Referencia do fabricante
    fabricante = randi(10);
    resistencia =resValues(randi(length(resValues)))*resScale(randi(length(resScale)));
    preco = rand;
    disponibilidade = randi([0 100],1);
    potencia = resPotVal(randi(length(resPotVal)));
    tolerancia = resTolVal(randi(length(resPotVal)));
    resEstilo = randi([0 1],1); %estilo PTH (0) ou SMD (1)
    res(:,i) = [refPM refFabricante resistencia tolerancia preco potencia disponibilidade resEstilo];
end

fid = fopen('test.js','w');
fprintf(fid,'[\n');
for i=1:maxItens
    %     fprintf(fid,'ID %i\n',  j);
    fprintf(fid,'{\n');
    fprintf(fid,'"categoria": "componentes_passivos",\n');
    fprintf(fid,'"subcategoria": "resistores",\n');
    fprintf(fid,'"ref_PM":"%s",\n',  int2str(res(1,i)));
    fprintf(fid,'"ref_fabricante": "%s",\n',  int2str(res(2,i)));
    fprintf(fid,'"disponibilidade": "%s",\n',  int2str(res(7,i)));
    fprintf(fid,'"imagens": "%s",\n',  resImgPath);
    fprintf(fid,'"preco": %.2f,\n', rand+0.02)
    fprintf(fid,'"caracteristicas":');
    fprintf(fid,'[');
    fprintf(fid,'{nome:"resistencia",');
    fprintf(fid,'valor: "%s"},\n',  int2str(res(3,i)));
    fprintf(fid,'{nome:"tolerancia",');
    fprintf(fid,'valor: "%s"},\n',  int2str(res(4,i)));
    fprintf(fid,'{nome:"potencia",');
    fprintf(fid,'valor: "%s"},\n',  int2str(res(6,i)));
    fprintf(fid,'{nome:"acabamento",');
    if(res(8,i)==0)
        acab = 'PTH';
    else
        acab = 'SMD';
    end
    fprintf(fid,'valor: "%s"}\n',acab);
    fprintf(fid,'],\n');
    
    descr =  ['resistor '  acab ' ' int2str(res(3,i)) 'k '...
        int2str(res(4,i)) '% ' int2str(round((res(6,i)*1000))/1000) 'w'];
    tag =  ['componentes passivos resistor ' int2str(res(1,i)) ' ' int2str(res(2,i)) ' ' int2str(res(3,i)) 'k '...
        int2str(res(4,i)) '% ' int2str(round((res(6,i)*1000))/1000) 'w'];
    fprintf(fid,'"descricao":');
    fprintf(fid,'"%s",\n',descr);
    fprintf(fid,'"tags":');
    fprintf(fid,'"%s"\n',tag);
    fprintf(fid,'},\n');
    
    
    refPm =  int2str(randperm(100000000,1));
    refFab = int2str(randperm(100000000,1));
    cap =  int2str(capsValues(randi(length(capsValues)))*CapsScale(randi(length(CapsScale))));
    tol =  int2str(CapsTol(randi(length(CapsTol))));
    preco =  rand+0.02;
    tensao =  int2str(CapsVolt(randi(length(CapsVolt))));
    disp = int2str(randi(100,1));
    
    fprintf(fid,'{\n');
    fprintf(fid,'"categoria": "componentes_passivos",\n');
    fprintf(fid,'"subcategoria": "capacitores",\n');
    fprintf(fid,'"ref_PM": "%s",\n',refPm)  ;
    fprintf(fid,'"ref_fabricante": "%s",\n', refFab);
    fprintf(fid,'"disponibilidade": "%s",\n',  disp);
    fprintf(fid,'"preco": %.2f,\n', preco );
    fprintf(fid,'"caracteristicas":');
    fprintf(fid,'[');
    fprintf(fid,'{nome:"capacitancia",\n');
    fprintf(fid,'valor: "%s"},\n', cap);
    fprintf(fid,'{nome:"tolerancia",\n' );
    fprintf(fid,'valor:"%s"},\n',tol );
    fprintf(fid,'{nome:"tensao",\n' );
    fprintf(fid,'valor: "%s"},\n', tensao );
    fprintf(fid,'{nome:"acabamento",');
    if(res(8,i)==0)
        acab = 'PTH';
        CapsImgPath ='../../assets/img/produtos/capacitor/capPTH.jpg';
        
    else
        acab = 'SMD';
        CapsImgPath ='../../assets/img/produtos/capacitor/capSMD.jpg';
        
    end
    fprintf(fid,'valor: "%s"}\n',acab);
    fprintf(fid,'],\n');
    
    fprintf(fid,'"imagens": "%s",\n',  CapsImgPath);
    descr = ['capacitor ' acab ' '  cap 'F' ' ' tol '% ' tensao 'V'];
    fprintf(fid,'descricao:');
    fprintf(fid,'"%s",\n',descr);
    tag = ['componentes passivos capacitor ' refPm ' ' refFab ' ' cap 'F'...
        ' ' tol '% ' tensao 'V'];
    descr = ['capacitor ' acab ' '  cap 'F' ' ' tol '% ' tensao 'V'];
    fprintf(fid,' "tags":');
    fprintf(fid,'"%s"\n',tag);
    
    if(i==maxItens)
        fprintf(fid,'}\n');
    else
        fprintf(fid,'},\n');
    end
    
end
fprintf(fid,']\n');


%%Capacitor
%     fprintf(fid,'{\n');
%     fprintf(fid,'"categoria": "componentes_passivos",\n');
%     fprintf(fid,'"subcategoria": "capacitor",\n');
%     fprintf(fid,'"ref_PM": %i,\n',   randperm(100000000,1));
%     fprintf(fid,'"ref_fabricante": %i,\n',   randperm(100000000,10));
%     fprintf(fid,'"capacitancia": %i,\n',  capsValues(randi(length(capsValues)))*CapsScale(randi(length(CapsScale))));
%     fprintf(fid,'"tolerancia":,\n',  int2str(CapsTol(randi(length(CapsTol)))));
%     fprintf(fid,'"preco": %.2f,\n',   int2str(rand+0.05));
%     fprintf(fid,'"potencia": %.2f,\n',   int2str(round((res(6,i)*1000))/1000));
%     fprintf(fid,'"disponibilidade": %i,\n',  int2str(randi([0 100],1)));
%     if(res(8,i)==0)
%         fprintf(fid,'"acabamento": "PTH",\n');
%     else
%         fprintf(fid,'"acabamento": "SMD",\n');
%     end