// 5GLabX Cloud - Protocol Models and Message Generators
// Realistic 3GPP-compliant protocol message models

export interface ProtocolMessage {
  id: string;
  order: number;
  layer: 'RRC' | 'NAS' | 'S1AP' | 'NGAP' | 'SIP' | 'Diameter' | 'F1AP' | 'E1AP' | 'E2AP' | 'GTP-U' | 'PC5' | 'Uu';
  direction: string;
  messageType: string;
  timestamp: number;
  source: { type: string; id: string };
  destination: { type: string; id: string };
  ies: Record<string, any>;
  rawMessage: Buffer;
  correlationKeys: Record<string, any>;
}

export interface MessageFlow {
  id: string;
  name: string;
  steps: ProtocolMessage[];
  totalDuration: number;
  success: boolean;
}

export interface UEContext {
  ueId: string;
  imsi: string;
  sTMSI: string;
  rnti: number;
  cRNTI: number;
  plmnId: string;
  tac: string;
  cellId: string;
  guti?: string;
  msisdn?: string;
  privateUserIdentity?: string;
  publicUserIdentity?: string;
}

export interface NetworkContext {
  enbId: string;
  gnbId: string;
  mmeId: string;
  amfId: string;
  enbUeId: number;
  amfUeId: number;
  plmnId: string;
  tac: string;
  cellId: string;
  mmeCode: number;
  mmeGroupId: number;
  pCSCF?: string;
  sCSCF?: string;
  iCSCF?: string;
  hss?: string;
}

// Realistic Parameter Generators
export class ParameterGenerator {
  // Generate realistic IMSI (MCC + MNC + MSIN)
  static generateIMSI(mcc: string = '001', mnc: string = '01'): string {
    const msin = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    return mcc + mnc + msin;
  }

  // Generate realistic S-TMSI (MME Code + M-TMSI)
  static generateSTMSI(mmeCode: number = 0x01): string {
    const mTMSI = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    return mmeCode.toString(16).padStart(2, '0') + mTMSI;
  }

  // Generate realistic RNTI (C-RNTI range: 0x003D to 0xFFF3)
  static generateRNTI(): number {
    return Math.floor(Math.random() * (0xFFF3 - 0x003D + 1)) + 0x003D;
  }

  // Generate realistic PLMN ID
  static generatePLMNId(mcc: string = '001', mnc: string = '01'): string {
    return mcc + mnc;
  }

  // Generate realistic TAC (0x0001 to 0xFFFF)
  static generateTAC(): string {
    return Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, '0');
  }

  // Generate realistic Cell ID
  static generateCellId(): string {
    return Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
  }

  // Generate realistic eNB ID
  static generateENBId(): string {
    return 'eNB-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }

  // Generate realistic gNB ID
  static generateGNBId(): string {
    return 'gNB-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  }

  // Generate realistic MME ID
  static generateMMEId(): string {
    return 'MME-' + Math.floor(Math.random() * 100).toString().padStart(2, '0');
  }

  // Generate realistic AMF ID
  static generateAMFId(): string {
    return 'AMF-' + Math.floor(Math.random() * 100).toString().padStart(2, '0');
  }

  // Generate realistic GUTI
  static generateGUTI(plmnId: string, mmeGroupId: number, mmeCode: number): string {
    const mTMSI = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0');
    return plmnId + mmeGroupId.toString(16).padStart(4, '0') + mmeCode.toString(16).padStart(2, '0') + mTMSI;
  }

  // Generate realistic MSISDN
  static generateMSISDN(countryCode: string = '+1'): string {
    const number = Math.floor(Math.random() * 1000000000).toString().padStart(10, '0');
    return countryCode + number;
  }

  // Generate realistic IMS identities
  static generateIMSIdentities(imsi: string): { private: string; public: string } {
    const privateIdentity = `${imsi}@ims.mnc001.mcc001.3gppnetwork.org`;
    const msisdn = this.generateMSISDN();
    const publicIdentity = `sip:${msisdn}@ims.mnc001.mcc001.3gppnetwork.org`;
    return { private: privateIdentity, public: publicIdentity };
  }
}

// Message Flow Generator
export class MessageFlowGenerator {
  private ueContext: UEContext;
  private networkContext: NetworkContext;

  constructor() {
    this.ueContext = this.createUEContext();
    this.networkContext = this.createNetworkContext();
  }

  private createUEContext(): UEContext {
    const imsi = ParameterGenerator.generateIMSI();
    const plmnId = ParameterGenerator.generatePLMNId();
    const tac = ParameterGenerator.generateTAC();
    const cellId = ParameterGenerator.generateCellId();
    const rnti = ParameterGenerator.generateRNTI();
    const sTMSI = ParameterGenerator.generateSTMSI();
    const imsIdentities = ParameterGenerator.generateIMSIdentities(imsi);

    return {
      ueId: `UE-${Math.floor(Math.random() * 10000)}`,
      imsi,
      sTMSI,
      rnti,
      cRNTI: rnti,
      plmnId,
      tac,
      cellId,
      msisdn: ParameterGenerator.generateMSISDN(),
      privateUserIdentity: imsIdentities.private,
      publicUserIdentity: imsIdentities.public
    };
  }

  private createNetworkContext(): NetworkContext {
    const plmnId = ParameterGenerator.generatePLMNId();
    const tac = ParameterGenerator.generateTAC();
    const cellId = ParameterGenerator.generateCellId();

    return {
      enbId: ParameterGenerator.generateENBId(),
      gnbId: ParameterGenerator.generateGNBId(),
      mmeId: ParameterGenerator.generateMMEId(),
      amfId: ParameterGenerator.generateAMFId(),
      enbUeId: Math.floor(Math.random() * 1000),
      amfUeId: Math.floor(Math.random() * 1000),
      plmnId,
      tac,
      cellId,
      mmeCode: 0x01,
      mmeGroupId: 0x0001,
      pCSCF: 'p-cscf.ims.mnc001.mcc001.3gppnetwork.org',
      sCSCF: 's-cscf.ims.mnc001.mcc001.3gppnetwork.org',
      iCSCF: 'i-cscf.ims.mnc001.mcc001.3gppnetwork.org',
      hss: 'hss.ims.mnc001.mcc001.3gppnetwork.org'
    };
  }

  // Generate Basic Attach Procedure
  generateAttachFlow(): MessageFlow {
    const flow: MessageFlow = {
      id: `attach-${Date.now()}`,
      name: 'Basic Attach Procedure',
      steps: [],
      totalDuration: 0,
      success: true
    };

    const startTime = Date.now();
    let currentTime = startTime;

    // Step 1: RRC Connection Request
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 1,
      layer: 'RRC',
      direction: 'UE→eNB',
      messageType: 'RRCConnectionRequest',
      timestamp: currentTime,
      source: { type: 'UE', id: this.ueContext.ueId },
      destination: { type: 'eNB', id: this.networkContext.enbId },
      ies: {
        establishmentCause: 'mo-Signalling',
        ueIdentity: {
          sTMSI: this.ueContext.sTMSI
        }
      },
      rawMessage: this.generateRRCConnectionRequest(),
      correlationKeys: {
        rnti: this.ueContext.rnti,
        sTMSI: this.ueContext.sTMSI,
        cellId: this.networkContext.cellId
      }
    });

    currentTime += 10;

    // Step 2: RRC Connection Setup
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 2,
      layer: 'RRC',
      direction: 'eNB→UE',
      messageType: 'RRCConnectionSetup',
      timestamp: currentTime,
      source: { type: 'eNB', id: this.networkContext.enbId },
      destination: { type: 'UE', id: this.ueContext.ueId },
      ies: {
        rrcTransactionIdentifier: 0,
        criticalExtensions: {
          rrcConnectionSetupR8: {
            radioResourceConfigDedicated: {
              srbToAddModList: [{
                srbIdentity: 1,
                rlcConfig: {
                  ulRLCConfig: {
                    am: {
                      ulAMRLC: {
                        maxRetxThreshold: 't32',
                        pollPDU: 'p4',
                        pollByte: 'kB25',
                        tPollRetransmit: 'ms45'
                      }
                    }
                  }
                }
              }]
            }
          }
        }
      },
      rawMessage: this.generateRRCConnectionSetup(),
      correlationKeys: {
        rnti: this.ueContext.rnti,
        cRNTI: this.ueContext.cRNTI
      }
    });

    currentTime += 10;

    // Step 3: RRC Connection Setup Complete
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 3,
      layer: 'RRC',
      direction: 'UE→eNB',
      messageType: 'RRCConnectionSetupComplete',
      timestamp: currentTime,
      source: { type: 'UE', id: this.ueContext.ueId },
      destination: { type: 'eNB', id: this.networkContext.enbId },
      ies: {
        rrcTransactionIdentifier: 0,
        criticalExtensions: {
          rrcConnectionSetupCompleteR8: {
            selectedPLMNIdentity: 1,
            dedicatedInfoNAS: 'NAS_ATTACH_REQUEST'
          }
        }
      },
      rawMessage: this.generateRRCConnectionSetupComplete(),
      correlationKeys: {
        rnti: this.ueContext.rnti,
        cRNTI: this.ueContext.cRNTI
      }
    });

    currentTime += 10;

    // Step 4: Initial UE Message (S1AP)
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 4,
      layer: 'S1AP',
      direction: 'eNB→MME',
      messageType: 'InitialUEMessage',
      timestamp: currentTime,
      source: { type: 'eNB', id: this.networkContext.enbId },
      destination: { type: 'MME', id: this.networkContext.mmeId },
      ies: {
        eNBUEID: this.networkContext.enbUeId,
        nasPDU: 'NAS_ATTACH_REQUEST',
        tAI: {
          pLMNidentity: this.networkContext.plmnId,
          tAC: this.networkContext.tac
        },
        rRCestablishmentCause: 'mo-Signalling'
      },
      rawMessage: this.generateInitialUEMessage(),
      correlationKeys: {
        enbUeId: this.networkContext.enbUeId,
        plmnId: this.networkContext.plmnId,
        tac: this.networkContext.tac
      }
    });

    currentTime += 10;

    // Step 5: NAS Attach Request
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 5,
      layer: 'NAS',
      direction: 'UE→MME',
      messageType: 'AttachRequest',
      timestamp: currentTime,
      source: { type: 'UE', id: this.ueContext.ueId },
      destination: { type: 'MME', id: this.networkContext.mmeId },
      ies: {
        securityHeaderType: 'Plain',
        protocolDiscriminator: 'EPSMobilityManagement',
        nasKeySetIdentifier: 0,
        epsAttachType: 'EPSAttach',
        epsMobileIdentity: {
          type: 'IMSI',
          imsi: this.ueContext.imsi
        },
        ueNetworkCapability: {
          eea0: true,
          eea1: true,
          eea2: true,
          eea3: true,
          eia0: true,
          eia1: true,
          eia2: true,
          eia3: true
        },
        esmMessageContainer: 'ESM_ATTACH_REQUEST'
      },
      rawMessage: this.generateNASAttachRequest(),
      correlationKeys: {
        imsi: this.ueContext.imsi,
        plmnId: this.networkContext.plmnId
      }
    });

    flow.totalDuration = currentTime - startTime;
    return flow;
  }

  // Generate IMS Registration Flow
  generateIMSRegistrationFlow(): MessageFlow {
    const flow: MessageFlow = {
      id: `ims-reg-${Date.now()}`,
      name: 'IMS Registration Procedure',
      steps: [],
      totalDuration: 0,
      success: true
    };

    const startTime = Date.now();
    let currentTime = startTime;

    // Step 1: SIP REGISTER
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 1,
      layer: 'SIP',
      direction: 'UE→P-CSCF',
      messageType: 'REGISTER',
      timestamp: currentTime,
      source: { type: 'UE', id: this.ueContext.ueId },
      destination: { type: 'P-CSCF', id: this.networkContext.pCSCF! },
      ies: {
        method: 'REGISTER',
        requestUri: 'sip:ims.mnc001.mcc001.3gppnetwork.org',
        from: this.ueContext.publicUserIdentity,
        to: this.ueContext.publicUserIdentity,
        callId: `call-id-${Date.now()}`,
        cseq: '1 REGISTER',
        contact: `sip:${this.ueContext.msisdn}@[2001:db8::1]:5060`,
        expires: '600',
        userAgent: '5GLabX-UE/1.0',
        supported: 'path, gruu',
        pAccessNetworkInfo: '3GPP-E-UTRAN-FDD; utran-cell-id-3gpp=0010100000001',
        pVisitedNetworkId: this.networkContext.plmnId
      },
      rawMessage: this.generateSIPRegister(),
      correlationKeys: {
        callId: `call-id-${Date.now()}`,
        from: this.ueContext.publicUserIdentity,
        contact: `sip:${this.ueContext.msisdn}@[2001:db8::1]:5060`
      }
    });

    currentTime += 15;

    // Step 2: Diameter UAR
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 2,
      layer: 'Diameter',
      direction: 'I-CSCF→HSS',
      messageType: 'User-Authorization-Request',
      timestamp: currentTime,
      source: { type: 'I-CSCF', id: this.networkContext.iCSCF! },
      destination: { type: 'HSS', id: this.networkContext.hss! },
      ies: {
        commandCode: 300,
        applicationId: 16777216,
        hopByHopId: Math.floor(Math.random() * 0xFFFFFFFF),
        endToEndId: Math.floor(Math.random() * 0xFFFFFFFF),
        avps: [
          {
            code: 1,
            name: 'User-Name',
            value: this.ueContext.privateUserIdentity
          },
          {
            code: 601,
            name: 'Public-Identity',
            value: this.ueContext.publicUserIdentity
          },
          {
            code: 602,
            name: 'Visited-Network-Identifier',
            value: this.networkContext.plmnId
          }
        ]
      },
      rawMessage: this.generateDiameterUAR(),
      correlationKeys: {
        sessionId: `ims.mnc001.mcc001.3gppnetwork.org;300;${Date.now()}`,
        userName: this.ueContext.privateUserIdentity,
        publicIdentity: this.ueContext.publicUserIdentity
      }
    });

    currentTime += 15;

    // Step 3: SIP 200 OK
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 3,
      layer: 'SIP',
      direction: 'P-CSCF→UE',
      messageType: '200 OK',
      timestamp: currentTime,
      source: { type: 'P-CSCF', id: this.networkContext.pCSCF! },
      destination: { type: 'UE', id: this.ueContext.ueId },
      ies: {
        statusCode: 200,
        reasonPhrase: 'OK',
        from: this.ueContext.publicUserIdentity,
        to: this.ueContext.publicUserIdentity,
        callId: `call-id-${Date.now()}`,
        cseq: '1 REGISTER',
        contact: `sip:${this.ueContext.msisdn}@[2001:db8::1]:5060`,
        expires: '600',
        serviceRoute: `sip:${this.networkContext.sCSCF};lr`,
        pAssociatedURI: this.ueContext.publicUserIdentity
      },
      rawMessage: this.generateSIP200OK(),
      correlationKeys: {
        callId: `call-id-${Date.now()}`,
        serviceRoute: `sip:${this.networkContext.sCSCF};lr`
      }
    });

    flow.totalDuration = currentTime - startTime;
    return flow;
  }

  // Generate F1 Setup Flow
  generateF1SetupFlow(): MessageFlow {
    const flow: MessageFlow = {
      id: `f1-setup-${Date.now()}`,
      name: 'F1 Setup Procedure',
      steps: [],
      totalDuration: 0,
      success: true
    };

    const startTime = Date.now();
    let currentTime = startTime;

    // Step 1: F1 Setup Request
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 1,
      layer: 'F1AP',
      direction: 'gNB-DU→gNB-CU',
      messageType: 'F1SetupRequest',
      timestamp: currentTime,
      source: { type: 'gNB-DU', id: 'gNB-DU-001' },
      destination: { type: 'gNB-CU', id: this.networkContext.gnbId },
      ies: {
        transactionID: 1,
        gNBDUName: 'gNB-DU-001',
        gNBDUServedCellsList: [{
          servedCellsItem: {
            nRCGI: {
              pLMNIdentity: this.networkContext.plmnId,
              nRCellIdentity: '000000000000000000000000000000000001'
            },
            nRPCI: 1,
            servedPLMNs: [{
              pLMNIdentity: this.networkContext.plmnId
            }],
            nRFreqInfo: {
              nRARFCN: 1850,
              frequencyBandList: [{
                frequencyBandItem: {
                  frequencyBandIndicatorNR: 3
                }
              }]
            }
          }
        }]
      },
      rawMessage: this.generateF1SetupRequest(),
      correlationKeys: {
        transactionID: 1,
        duName: 'gNB-DU-001',
        plmnId: this.networkContext.plmnId,
        cellId: '000000000000000000000000000000000001'
      }
    });

    currentTime += 10;

    // Step 2: F1 Setup Response
    flow.steps.push({
      id: `step-${flow.steps.length + 1}`,
      order: 2,
      layer: 'F1AP',
      direction: 'gNB-CU→gNB-DU',
      messageType: 'F1SetupResponse',
      timestamp: currentTime,
      source: { type: 'gNB-CU', id: this.networkContext.gnbId },
      destination: { type: 'gNB-DU', id: 'gNB-DU-001' },
      ies: {
        transactionID: 1,
        gNBCUName: this.networkContext.gnbId,
        cellsToBeActivatedList: [{
          cellsToBeActivatedItem: {
            nRCGI: {
              pLMNIdentity: this.networkContext.plmnId,
              nRCellIdentity: '000000000000000000000000000000000001'
            },
            nRPCI: 1,
            servedPLMNs: [{
              pLMNIdentity: this.networkContext.plmnId
            }],
            nRFreqInfo: {
              nRARFCN: 1850,
              frequencyBandList: [{
                frequencyBandItem: {
                  frequencyBandIndicatorNR: 3
                }
              }]
            }
          }
        }]
      },
      rawMessage: this.generateF1SetupResponse(),
      correlationKeys: {
        transactionID: 1,
        cuName: this.networkContext.gnbId,
        plmnId: this.networkContext.plmnId,
        cellId: '000000000000000000000000000000000001'
      }
    });

    flow.totalDuration = currentTime - startTime;
    return flow;
  }

  // Message Generation Methods
  private generateRRCConnectionRequest(): Buffer {
    const message = {
      messageType: 'RRCConnectionRequest',
      criticalExtensions: {
        rrcConnectionRequest: {
          ueIdentity: {
            sTMSI: this.ueContext.sTMSI
          },
          establishmentCause: 'mo-Signalling'
        }
      }
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateRRCConnectionSetup(): Buffer {
    const message = {
      messageType: 'RRCConnectionSetup',
      rrcTransactionIdentifier: 0,
      criticalExtensions: {
        rrcConnectionSetupR8: {
          radioResourceConfigDedicated: {
            srbToAddModList: [{
              srbIdentity: 1,
              rlcConfig: {
                ulRLCConfig: {
                  am: {
                    ulAMRLC: {
                      maxRetxThreshold: 't32',
                      pollPDU: 'p4',
                      pollByte: 'kB25',
                      tPollRetransmit: 'ms45'
                    }
                  }
                }
              }
            }]
          }
        }
      }
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateRRCConnectionSetupComplete(): Buffer {
    const message = {
      messageType: 'RRCConnectionSetupComplete',
      rrcTransactionIdentifier: 0,
      criticalExtensions: {
        rrcConnectionSetupCompleteR8: {
          selectedPLMNIdentity: 1,
          dedicatedInfoNAS: 'NAS_ATTACH_REQUEST'
        }
      }
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateInitialUEMessage(): Buffer {
    const message = {
      messageType: 'InitialUEMessage',
      protocolIEs: {
        eNBUEID: this.networkContext.enbUeId,
        nasPDU: 'NAS_ATTACH_REQUEST',
        tAI: {
          pLMNidentity: this.networkContext.plmnId,
          tAC: this.networkContext.tac
        },
        rRCestablishmentCause: 'mo-Signalling'
      }
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateNASAttachRequest(): Buffer {
    const message = {
      messageType: 'AttachRequest',
      securityHeaderType: 'Plain',
      protocolDiscriminator: 'EPSMobilityManagement',
      nasKeySetIdentifier: 0,
      epsAttachType: 'EPSAttach',
      epsMobileIdentity: {
        type: 'IMSI',
        imsi: this.ueContext.imsi
      },
      ueNetworkCapability: {
        eea0: true,
        eea1: true,
        eea2: true,
        eea3: true,
        eia0: true,
        eia1: true,
        eia2: true,
        eia3: true
      },
      esmMessageContainer: 'ESM_ATTACH_REQUEST'
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateSIPRegister(): Buffer {
    const message = {
      method: 'REGISTER',
      requestUri: 'sip:ims.mnc001.mcc001.3gppnetwork.org',
      from: this.ueContext.publicUserIdentity,
      to: this.ueContext.publicUserIdentity,
      callId: `call-id-${Date.now()}`,
      cseq: '1 REGISTER',
      contact: `sip:${this.ueContext.msisdn}@[2001:db8::1]:5060`,
      expires: '600',
      userAgent: '5GLabX-UE/1.0',
      supported: 'path, gruu',
      pAccessNetworkInfo: '3GPP-E-UTRAN-FDD; utran-cell-id-3gpp=0010100000001',
      pVisitedNetworkId: this.networkContext.plmnId
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateDiameterUAR(): Buffer {
    const message = {
      commandCode: 300,
      applicationId: 16777216,
      hopByHopId: Math.floor(Math.random() * 0xFFFFFFFF),
      endToEndId: Math.floor(Math.random() * 0xFFFFFFFF),
      avps: [
        {
          code: 1,
          name: 'User-Name',
          value: this.ueContext.privateUserIdentity
        },
        {
          code: 601,
          name: 'Public-Identity',
          value: this.ueContext.publicUserIdentity
        },
        {
          code: 602,
          name: 'Visited-Network-Identifier',
          value: this.networkContext.plmnId
        }
      ]
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateSIP200OK(): Buffer {
    const message = {
      statusCode: 200,
      reasonPhrase: 'OK',
      from: this.ueContext.publicUserIdentity,
      to: this.ueContext.publicUserIdentity,
      callId: `call-id-${Date.now()}`,
      cseq: '1 REGISTER',
      contact: `sip:${this.ueContext.msisdn}@[2001:db8::1]:5060`,
      expires: '600',
      serviceRoute: `sip:${this.networkContext.sCSCF};lr`,
      pAssociatedURI: this.ueContext.publicUserIdentity
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateF1SetupRequest(): Buffer {
    const message = {
      messageType: 'F1SetupRequest',
      protocolIEs: {
        transactionID: 1,
        gNBDUName: 'gNB-DU-001',
        gNBDUServedCellsList: [{
          servedCellsItem: {
            nRCGI: {
              pLMNIdentity: this.networkContext.plmnId,
              nRCellIdentity: '000000000000000000000000000000000001'
            },
            nRPCI: 1,
            servedPLMNs: [{
              pLMNIdentity: this.networkContext.plmnId
            }],
            nRFreqInfo: {
              nRARFCN: 1850,
              frequencyBandList: [{
                frequencyBandItem: {
                  frequencyBandIndicatorNR: 3
                }
              }]
            }
          }
        }]
      }
    };
    return Buffer.from(JSON.stringify(message));
  }

  private generateF1SetupResponse(): Buffer {
    const message = {
      messageType: 'F1SetupResponse',
      protocolIEs: {
        transactionID: 1,
        gNBCUName: this.networkContext.gnbId,
        cellsToBeActivatedList: [{
          cellsToBeActivatedItem: {
            nRCGI: {
              pLMNIdentity: this.networkContext.plmnId,
              nRCellIdentity: '000000000000000000000000000000000001'
            },
            nRPCI: 1,
            servedPLMNs: [{
              pLMNIdentity: this.networkContext.plmnId
            }],
            nRFreqInfo: {
              nRARFCN: 1850,
              frequencyBandList: [{
                frequencyBandItem: {
                  frequencyBandIndicatorNR: 3
                }
              }]
            }
          }
        }]
      }
    };
    return Buffer.from(JSON.stringify(message));
  }
}

// Export utility functions
export const generateMessageFlow = (flowType: 'attach' | 'ims-registration' | 'f1-setup'): MessageFlow => {
  const generator = new MessageFlowGenerator();
  
  switch (flowType) {
    case 'attach':
      return generator.generateAttachFlow();
    case 'ims-registration':
      return generator.generateIMSRegistrationFlow();
    case 'f1-setup':
      return generator.generateF1SetupFlow();
    default:
      throw new Error(`Unknown flow type: ${flowType}`);
  }
};

export const generateRealisticParameters = () => {
  return {
    ue: {
      imsi: ParameterGenerator.generateIMSI(),
      sTMSI: ParameterGenerator.generateSTMSI(),
      rnti: ParameterGenerator.generateRNTI(),
      plmnId: ParameterGenerator.generatePLMNId(),
      tac: ParameterGenerator.generateTAC(),
      cellId: ParameterGenerator.generateCellId(),
      msisdn: ParameterGenerator.generateMSISDN()
    },
    network: {
      enbId: ParameterGenerator.generateENBId(),
      gnbId: ParameterGenerator.generateGNBId(),
      mmeId: ParameterGenerator.generateMMEId(),
      amfId: ParameterGenerator.generateAMFId(),
      plmnId: ParameterGenerator.generatePLMNId(),
      tac: ParameterGenerator.generateTAC(),
      cellId: ParameterGenerator.generateCellId()
    }
  };
};